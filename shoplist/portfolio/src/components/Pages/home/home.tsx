import React from 'react';
import './home.scss';
import { Header } from '../siteStructures/header/header';
import { Main } from '../siteStructures/main/main';
import { Footer } from '../siteStructures/footer/footer';

export const Home = () => {
  return (
    <div className='Home'>
      <Header />
      <div className='home'>
        <h1>Home</h1>
      </div>
      <Footer />
    </div>
  );
};
