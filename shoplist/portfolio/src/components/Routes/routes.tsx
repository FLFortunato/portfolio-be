import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { history } from '../../history';
import { Home } from '../Pages/home/home';
import { About } from '../Pages/about/about';
import { Projects } from '../Pages/projects/projects';
import { Contact } from '../Pages/contact/contact';
import { Login } from '../Pages/login/login.page';
import { Register } from '../Pages/register/register.page';
import { PrivateRoute } from './privateRoutes';
import { Profile } from '../Pages/profile/profile.page';
export const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route component={Register} exact path='/registrar'></Route>
        <Route component={Login} exact path='/login'></Route>
        <PrivateRoute component={Home} exact path='/'></PrivateRoute>
        <PrivateRoute component={About} exact path='/sobre'></PrivateRoute>
        <PrivateRoute
          component={Projects}
          exact
          path='/projetos'
        ></PrivateRoute>
        <PrivateRoute component={Contact} exact path='/contato'></PrivateRoute>
        <PrivateRoute component={Profile} exact path='/perfil'></PrivateRoute>
      </Switch>
    </Router>
  );
};
