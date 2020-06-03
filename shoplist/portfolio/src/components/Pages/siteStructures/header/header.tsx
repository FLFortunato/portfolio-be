import React from 'react';
import './header.scss';
export const Header = () => {
  return (
    <div className='header'>
      <div className='main d-flex justify-content-between'>
        <h1 className='mt-4 m-3'> {'<F/>'}</h1>
        <nav className='mt-4 m-3'>
          <ul className='d-flex ulStyle'>
            <li className='m-2'>
              <a href='/'> Home</a>
            </li>
            <li className='m-2'>
              <a href='/sobre'> Sobre</a>
            </li>
            <li className='m-2'>
              <a href='/projetos'> Projetos</a>
            </li>
            <li className='m-2'>
              <a href='/contato'> Contato</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
