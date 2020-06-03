import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { history } from '../../history';
import { Home } from '../Pages/home/home';
import { About } from '../Pages/about/about';
import { Projects } from '../Pages/projects/projects';
import { Contact } from '../Pages/contact/contact';
export const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route component={Home} exact path='/'></Route>
        <Route component={About} exact path='/sobre'></Route>
        <Route component={Projects} exact path='/projetos'></Route>
        <Route component={Contact} exact path='/contato'></Route>
      </Switch>
    </Router>
  );
};
