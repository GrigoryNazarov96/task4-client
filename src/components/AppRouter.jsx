import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes, protectedRoute } from '../routes';

const AppRouter = () => {
  const isAuth = true;
  return (
      <Routes>
        {isAuth && (
          <Route
            path={protectedRoute.path}
            element={protectedRoute.Component}
            exact
          />
        )}
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} exact />
        ))}
        <Route path="*" element={<Navigate to={'/login'} replace />} />
      </Routes>
  );
};

export default AppRouter;
