import React, { useState, useEffect } from 'react';
import './register.scss';
import UserServiceInstance from '../../../services/user.service';
import { history } from '../../../history';
export const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassWord] = useState('');
  const [email, setEmail] = useState('');
  const [emailSpan, setEmailSpan] = useState('')
  const [nameSpan, setNameSpan] = useState('')
  const sendData = () => {
    if (!name) {
      setNameSpan('Campo nome é obrigatório')
    } else {
      setNameSpan('')
      UserServiceInstance().save({ name, email, password }).then((res) => {
        setEmailSpan('')
        history.push('/login')
      }).catch(e => {
        setEmailSpan('E-mail já está sendo usado')
      })
    }
  };


  useEffect(() => {
    if (name) {
      setNameSpan('')
    }
  }, [name])
  return (
    <div className=' mainCustom  d-flex '>
      <div className=' loginBg container '>
        <h1 className='text-center mt-2'>Register</h1>
        <div className='form-group '>
          <div className=''>
            <label className='font-weight-bolder ml-5'>Nome: </label>

            <input
              className='form-control w-75 ml-5'
              placeholder='Nome'
              onChange={(e) => setName(e.target.value)}
            ></input>
            <span>{nameSpan}</span>
          </div>
          <div className=''>
            <label className='font-weight-bolder ml-5'>Email: </label>
            <input
              className='form-control w-75 ml-5'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}

            ></input>
            <span>{emailSpan}</span>
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
