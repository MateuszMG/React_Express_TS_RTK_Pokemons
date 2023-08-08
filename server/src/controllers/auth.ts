import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

import { UserInput, UserModel, UserRoles } from '../models/user';

import { errorMessages } from '../utils/errors/errorMessages';
import {
  CookieNames,
  cookieOptions,
  getRefreshTokenFromCookies,
} from '../utils/helpers/cookies';
import {
  createAccessToken,
  createRefreshToken,
  decodeRefreshToken,
  JWTData,
} from '../utils/helpers/jwt';
import { controllerResponseTimeHistogram } from '../utils/metrics';
import { loginSchema, registerSchema } from '../utils/schemas/auth';

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const timer = controllerResponseTimeHistogram.startTimer();

    try {
      const { email, password, username } = await registerSchema.validate(
        req.body,
      );

      const user = await UserModel.findOne({ email });
      if (user) throw createHttpError(409, errorMessages.emailTaken);

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await new UserModel<UserInput>({
        email,
        password: passwordHash,
        refreshToken: '',
        roles: [UserRoles.USER],
        username,
      }).save();

      const jwtData: JWTData = {
        _id: newUser._id.toString(),
        roles: newUser.roles,
      };

      const refreshToken = createRefreshToken(jwtData);
      const accessToken = createAccessToken(jwtData);

      await UserModel.findByIdAndUpdate(newUser._id, { refreshToken });

      res.cookie(
        CookieNames.refreshToken,
        refreshToken,
        cookieOptions.refreshToken,
      );

      res.status(201).json({ accessToken });
      timer({ method: req.method, route: req.originalUrl, success: 'true' });
    } catch (error) {
      timer({ method: req.method, route: req.originalUrl, success: 'false' });
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    const timer = controllerResponseTimeHistogram.startTimer();

    try {
      const { password, email } = await loginSchema.validate(req.body);

      const user = await UserModel.findOne({ email });
      if (!user)
        throw createHttpError(406, {
          message: errorMessages.emailOrPassword,
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        throw createHttpError(406, {
          message: errorMessages.emailOrPassword,
        });

      const jwtData: JWTData = {
        _id: user._id.toString(),
        roles: user.roles,
      };

      const refreshToken = createRefreshToken(jwtData);
      const accessToken = createAccessToken(jwtData);

      await UserModel.findByIdAndUpdate(user._id, { refreshToken });

      res.cookie(
        CookieNames.refreshToken,
        refreshToken,
        cookieOptions.refreshToken,
      );

      res.json({ accessToken });
      timer({ method: req.method, route: req.originalUrl, success: 'true' });
    } catch (error) {
      timer({ method: req.method, route: req.originalUrl, success: 'false' });
      next(error);
    }
  },

  refreshToken: async (req: Request, res: Response, next: NextFunction) => {
    const timer = controllerResponseTimeHistogram.startTimer();

    try {
      const refreshToken = getRefreshTokenFromCookies(req);

      const user = decodeRefreshToken(refreshToken);

      const refreshTokenExists = !!(await UserModel.findOne({ refreshToken }));
      if (!refreshTokenExists)
        throw createHttpError(418, errorMessages.IAmATeapot);

      const jwtData: JWTData = {
        _id: user._id.toString(),
        roles: user.roles,
      };

      const accessToken = createAccessToken(jwtData);

      res.json({ accessToken });
      timer({ method: req.method, route: req.originalUrl, success: 'true' });
    } catch (error) {
      timer({ method: req.method, route: req.originalUrl, success: 'false' });
      next(error);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    const timer = controllerResponseTimeHistogram.startTimer();

    try {
      const refreshToken = getRefreshTokenFromCookies(req);

      res.clearCookie(CookieNames.refreshToken, { httpOnly: true });

      const user = decodeRefreshToken(refreshToken);

      const refreshTokenExists = !!(await UserModel.findOne({ refreshToken }));
      if (!refreshTokenExists)
        throw createHttpError(418, errorMessages.IAmATeapot);

      await UserModel.findByIdAndUpdate(user._id, { refreshToken: '' });

      res.sendStatus(200);
      timer({ method: req.method, route: req.originalUrl, success: 'true' });
    } catch (error) {
      timer({ method: req.method, route: req.originalUrl, success: 'false' });
      next(error);
    }
  },
};
