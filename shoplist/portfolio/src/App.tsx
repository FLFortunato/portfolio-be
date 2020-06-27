import React, { useState, useEffect } from 'react';
import { Routes } from './Routes/routes';
import { Header } from './components/Pages/siteStructures/header/header';
import { Footer } from './components/Pages/siteStructures/footer/footer';

const App = ({ props }: any) => {
  const [headers, setHeaders] = useState(Header);
  const [footers, setFooters] = useState(Footer);

  useEffect(() => {
    if (
      window.location.pathname === '/login' ||
      window.location.pathname === '/registrar'
    ) {
      setHeaders(<></>);
      setFooters(<></>);
    }
  }, []);

  return (
    <div>
      {headers}
      <Routes />

      {footers}
    </div>
  );
};

export default App;
