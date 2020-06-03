import React from 'react';
import './projects.scss';
import { Header } from '../siteStructures/header/header';

import { Footer } from '../siteStructures/footer/footer';

export const Projects = () => {
  return (
    <div className='Projects'>
      <Header />
      <div className='projects'>
        <h1>Projects</h1>
      </div>
      <Footer />
    </div>
  );
};
