import React from 'react';
import './projects.scss';
import { Header } from '../siteStructures/header/header';
import { Footer } from '../siteStructures/footer/footer';
import List from '../../../assets/icons/list.svg';
import { Pages } from '../../../models/enum/enum';

export const Projects = () => {
  return (
    <div className='Projects'>
      <Header />
      <div className='projects d-flex justify-content-around container'>
        <div>
          <a href={Pages.TodoList}>
            <img src={List} alt='list' className='icons' />
          </a>
        </div>
        <div>
          <img src={List} alt='list' className='icons' />
        </div>
        <div>
          <img src={List} alt='list' className='icons' />
        </div>
      </div>
      <Footer />
    </div>
  );
};
