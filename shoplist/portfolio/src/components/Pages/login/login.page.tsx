import React, { useState, useEffect, useRef, useContext } from 'react';
import './login.scss';
import { Form } from '@unform/web';
import { InputCS } from '../../Forms/input';
import * as yup from 'yup';
import { Userservice } from '../../services/user.service';
import { history } from '../../../history';

export const Login = () => {
  const [check, setCheck] = useState(Boolean);
  const [isChecked, setIsChecked] = useState('password');
  const [classs, setClasss] = useState('');

  const formRef = useRef<any>();
  const handleSubmit = async (data: any, { reset }: any) => {
    try {
      const formSchema = yup.object().shape({
        email: yup
          .string()
          .email('Digite um e-mail válido')
          .required('Campo e-mail é necessário'),

        password: yup.string().required('Campo senha é obrigatório'),
      });

      await formSchema.validate(data, {
        abortEarly: false,
      });

      Userservice()
        .login(data)
        .then((res) => {
          localStorage.setItem('auth-token', res.data.token);
          const userIdCheck = res.data.user.id;
          localStorage.setItem('userid', userIdCheck);

          history.push('/');
        });

      reset();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errorMessages: any = {};

        error.inner.forEach((err) => (errorMessages[err.path] = err.message));
        formRef.current.setErrors(errorMessages);
        console.log('Olha aqui==>', errorMessages);
      }
    }
  };

  useEffect(() => {
    if (check) {
      setIsChecked('');
    } else {
      setIsChecked('password');
    }
  }, [check]);
  return (
    <div className='RegisterMain'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-12 col-sm-6 col-md-9 '>
            <Form
              onSubmit={handleSubmit}
              className='form-group position '
              ref={formRef}
            >
              <h1 className='text-white mb-5'>Login</h1>

              <InputCS
                name='email'
                className={`w-50 form-control mt-3 ${classs}`}
                placeholder='E-mail'
              />
              <InputCS
                name='password'
                className={`w-50 form-control mt-3 ${classs}`}
                placeholder='Senha'
                type={`${isChecked}`}
              />

              <button className='btn btn-success rounded mt-3 w-50'>
                Login
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
