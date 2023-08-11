import { setupServer } from 'msw/node';

import { userHandlers } from './user/userHandlers';

export const msvServer = setupServer(...userHandlers);
