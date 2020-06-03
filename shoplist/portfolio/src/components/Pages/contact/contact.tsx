import React from 'react';
import './contact.scss';
import { Header } from '../siteStructures/header/header';

import { Footer } from '../siteStructures/footer/footer';

export const Contact = () => {
  return (
    <div className='Contact'>
      <Header />
      <div className='contact'>
        <h1>Contact</h1>
      </div>
      <Footer />
    </div>
  );
};
