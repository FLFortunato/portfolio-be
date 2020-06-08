import React, { useState, useEffect } from 'react';
import { Register } from './components/Pages/register/register.page';
import { Login } from './components/Pages/login/login.page';
import { Home } from './components/Pages/home/home';
import { Routes } from './components/Routes/routes';

import { UserIdContext } from './components/context/userIdContext';

const App = () => {
  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
