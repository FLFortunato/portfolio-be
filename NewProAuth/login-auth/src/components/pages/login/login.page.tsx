import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserServiceInstance from '../../../services/user.service';
import * as yup from 'yup';
import { history } from '../../../history';
import './login.scss'

export const LoginPage = () => {
  const [password, setPassWord] = useState('');
  const [email, setEmail] = useState('');

  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  const handleSubmit = () => {
    const userData = { email, password };

    try {
      UserServiceInstance().login(userData).then((res) => {
        if (res.headers) {
          localStorage.setItem('auth-token', res.data.token);
          history.push('/');
          localStorage.setItem('email', email);
        }
      });
    } catch (error) {

    }
  };

  return (
    <div className=' mainCustomLogin  '>
      <div className=' loginBg container'>
        <h1 className='text-center mt-2'>Login</h1>

        <form className='d-flex flex-column p-5'>
          <div className='form-group '>
            <input name='email' onChange={(e) => setEmail(e.target.value)} className='w-100 form-control' placeholder={'E-mail'} />
          </div>
          <div className='form-group '>
            <input
              name='password'
              type='password'
              onChange={(e) => setPassWord(e.target.value)}
              className='w-100 form-control'
              placeholder={'Senha'}
            />
          </div>
          <button
            onClick={handleSubmit}
            className='btn btn-secondary mt-3 w-100 '
            type='button'
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};
