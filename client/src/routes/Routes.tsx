import { Profiler, Suspense } from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import { Layout } from '../components/Layout/Layout';
import { SuspenseFallback } from '../components/SuspenseFallback/SuspenseFallback';

import { PrivateRoute } from '../hocs/PrivateRoute';

import { onRenderProfiler } from '../helpers/profiler';

import { routesConfig } from './routesConfig';

export const Routes = () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Layout>
        <Switch>
          {routesConfig.map(({ component: Component, path, roles }) => (
            <Route
              key={path}
              path={path}
              element={
                <Profiler
                  id={Component.name || path}
                  onRender={onRenderProfiler}
                >
                  <PrivateRoute roles={roles}>
                    <Component />
                  </PrivateRoute>
                </Profiler>
              }
            />
          ))}
        </Switch>
      </Layout>
    </Suspense>
  );
};
