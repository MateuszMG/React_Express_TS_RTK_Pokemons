import axiosLibrary from 'axios';

import { LocalStorage } from '../../helpers/LocalStorage';

import { serverApiUrl } from './const';

export const axios = () =>
  axiosLibrary.create({
    baseURL: serverApiUrl,
    headers: {
      authorization: 'Bearer ' + LocalStorage.get('accessToken'),
    },
    withCredentials: true,
  });
