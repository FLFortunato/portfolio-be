import React from 'react';
import './projects.scss';
import { Header } from '../siteStructures/header/header';

import { Footer } from '../siteStructures/footer/footer';
import { TodoListApp } from './todoList/todoList.project';

export const Projects = () => {
  return (
    <div className='Projects'>
      <Header />
      <div className='projects'>
        <TodoListApp/>
      </div>
      <Footer />
    </div>
  );
};