import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router';

export const PrivateRoutes = (props: any) => {
  const isLogged = localStorage.getItem('auth-token');

  return isLogged ? <Route {...props} /> : <Redirect to='/login' />;
};
