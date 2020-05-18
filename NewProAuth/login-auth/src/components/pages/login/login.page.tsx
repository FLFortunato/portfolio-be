import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserServiceInstance from '../../../services/user.service';
import * as yup from 'yup';
import { history } from '../../../history';

export const LoginPage = () => {
  const [password, setPassWord] = useState('');
  const [email, setEmail] = useState('');

  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  const handleSubmit = (values: any) => {
    UserServiceInstance.login(values).then((res) => {
      console.log(res.data);

      const { headers } = res;
      if (headers) {
        localStorage.setItem('auth-token', res.data);
        history.push('/');
      }
    });
  };

  return (
    <div className=' mainCustom container d-flex '>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        <div className=' loginBg  '>
          <h1 className='text-center mt-2'>Register</h1>

          <Form>
            <div className='form-group '>
              <Field name='email' className='Form-Field ml-5' />
              <ErrorMessage
                component='span'
                name='email'
                className='Form-Error'
              />
            </div>
            <div className='form-group '>
              <Field name='password' className=' ml-5' type='password' />
              <ErrorMessage
                component='span'
                name='password'
                className='Form-Error'
              />
            </div>
            <button
              onClick={handleSubmit}
              className='btn btn-secondary mt-5 ml-5'
              type='submit'
            >
              Registrar
            </button>
            <a href='#' className=''>
              Recuperar Senha
            </a>
          </Form>
        </div>
      </Formik>
    </div>
  );
};
