import { model, Schema } from 'mongoose';

export enum UserRoles {
  USER = 'USER',
}

export interface UserInput {
  username: string;
  email: string;
  password: string;
  refreshToken: string;
  roles: UserRoles[];
}

export interface User extends UserInput {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new Schema<UserInput>(
  {
    email: {
      maxlength: 128,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },

    username: {
      maxlength: 40,
      minlength: 3,
      required: true,
      trim: true,
      type: String,
    },

    password: {
      maxlength: 72,
      minlength: 6,
      required: true,
      trim: true,
      type: String,
    },

    refreshToken: String,

    roles: {
      type: [
        {
          type: String,
          enum: Object.keys(UserRoles) as UserRoles[],
        },
      ],
      default: [UserRoles.USER],
    },
  },
  { timestamps: true },
);

export const UserModel = model('user', userSchema);
