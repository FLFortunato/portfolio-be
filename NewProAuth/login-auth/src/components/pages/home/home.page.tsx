import React, { useEffect } from 'react';
import { history } from '../../../history';
import UserServiceInstance from '../../../services/user.service';
import { Header } from '../header/header'
export const Home = () => {
  const logOut = () => {
    localStorage.setItem('auth-token', '');
    history.push('/login');
  };

  useEffect(() => {
    UserServiceInstance().get().then((res) => {
      console.log('RESULTADO AQUI ==>', res.data);
    });
  }, []);
  return (
    <div>
      <Header />
      <button onClick={logOut}>Log out</button>
    </div>
  );
};
