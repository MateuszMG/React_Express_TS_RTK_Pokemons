import { Profiler } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ErrorBoundary } from './hocs/ErrorBoundary/ErrorBoundary';

import { onRenderProfiler } from './helpers/profiler';

import { Routes } from './routes/Routes';

import { store } from './redux/store';

export const App = () => {
  return (
    <Profiler id='app' onRender={onRenderProfiler}>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <ToastContainer />
            <Routes />
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </Profiler>
  );
};
