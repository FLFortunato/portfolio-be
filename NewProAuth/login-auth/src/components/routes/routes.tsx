import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { LoginPage } from '../pages/login/login.page';
import { Register } from '../pages/Register/register.page';
import { Home } from '../pages/home/home.page';
import { history } from '../../history';
import { PrivateRoutes } from './privateRoutes';
import { ContactPage } from '../pages/contact.page';
export const RoutesPage = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route component={LoginPage} exact path='/login' />
        <Route component={Register} exact path='/register' />
        <PrivateRoutes component={ContactPage} exact path='/contact' />
        <PrivateRoutes component={Home} exact path='/' />
      </Switch>
    </Router>
  );
};
