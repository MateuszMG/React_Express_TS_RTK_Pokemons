import axiosLibrary from 'axios';

import { getFromTheLS } from '../../helpers/localStorage';

import { serverApiUrl } from './const';

export const axios = () =>
  axiosLibrary.create({
    baseURL: serverApiUrl,
    headers: {
      authorization: 'Bearer ' + getFromTheLS('accessToken'),
    },
    withCredentials: true,
  });
