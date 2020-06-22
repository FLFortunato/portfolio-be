import React from 'react';
import './home.scss';
import { Header } from '../siteStructures/header/header';
import { Footer } from '../siteStructures/footer/footer';

export const Home = () => {
  return (
    <div className='Home'>
      <Header />
      <div className='home'></div>
      <Footer />
    </div>
  );
};
