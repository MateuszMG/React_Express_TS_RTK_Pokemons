import { Request } from 'express';

import { User } from '../models/user';

export interface AppRequest extends Request {
  user?: User;
}
