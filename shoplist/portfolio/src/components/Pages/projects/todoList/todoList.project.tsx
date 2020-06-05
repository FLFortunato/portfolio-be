import React, { useState } from 'react';
import './todoList.scss';
import { Input } from '../../../Forms/input';
export const TodoList = () => {
  const [list, setList] = useState([{ content: 'this' }]);

  return (
    <div className='container TodoList rounded'>
      <div className='listBody mt-2 border rounded'>
        <div className='listHead border text-center '>
          <h1 className='mt-3'>Todo List</h1>
        </div>
        <div className='listContent p-2'>
          {list &&
            list.map((l, i) => {
              return (
                <div
                  className='d-flex justify-content-between mt-2 itemDiv'
                  key={i}
                >
                  <p>{l.content}</p>
                  <div>
                    {' '}
                    <button className='btn btn-primary'>
                      <span className='material-icons'>edit</span>
                    </button>
                    <button
                      className='btn btn-danger ml-1'
                      onClick={() => console.log(i)}
                    >
                      <span className='material-icons'>delete_outline</span>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className='listFooter border p-2'>
          <input type='text' className='form-control w-100 ' />
          <button className='btn btn-success w-100 mt-1'>Enviar</button>
        </div>
      </div>
    </div>
  );
};
