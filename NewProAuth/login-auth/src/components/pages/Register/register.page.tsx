import React, { useState } from 'react';
import './register.scss';
import UserServiceInstance from '../../../services/user.service';
export const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassWord] = useState('');
  const [email, setEmail] = useState('');

  const sendData = () => {
    if (!name) {
      alert('hey');
    } else {
      UserServiceInstance.save({ name, email, password }).then((res) => {
        console.log(res.status);
        alert('success');
      });
    }
  };

  return (
    <div className=' mainCustom container d-flex '>
      <div className=' loginBg  '>
        <h1 className='text-center mt-2'>Register</h1>
        <div className='form-group '>
          <div className=''>
            <label className='font-weight-bolder ml-5'>Nome: </label>
            <input
              className='form-control w-75 ml-5'
              placeholder='Nome'
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className=''>
            <label className='font-weight-bolder ml-5'>Email: </label>
            <input
              className='form-control w-75 ml-5'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className=''>
            <label className='font-weight-bolder ml-5'>Senha: </label>
            <input
              className='form-control w-75 ml-5'
              placeholder='senha'
              onChange={(e) => setPassWord(e.target.value)}
              type='password'
            ></input>
          </div>

          <button onClick={sendData} className='btn btn-secondary mt-5 ml-5'>
            Registrar
          </button>
          <a href='#' className=''>
            Recuperar Senha
          </a>
        </div>
      </div>
    </div>
  );
};
