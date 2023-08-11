import '@testing-library/jest-dom';
import 'whatwg-fetch';

import { msvServer } from './src/utils/tests/mocks/msvServer.ts';

beforeAll(() => msvServer.listen());
afterEach(() => msvServer.resetHandlers());
afterAll(() => msvServer.close());
