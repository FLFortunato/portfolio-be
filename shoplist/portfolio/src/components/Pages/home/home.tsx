import React from 'react';
import { Header } from '../siteStructures/header/header';
import { Main } from '../siteStructures/main';
import { Footer } from '../siteStructures/footer';

export const Home = () => {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
