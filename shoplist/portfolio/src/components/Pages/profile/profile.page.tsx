import React, { useEffect, useState, useRef } from 'react';
import { Userservice } from '../../services/user.service';
import { User } from '../../../models/user.model';
import { Header } from '../siteStructures/header/header';
import { Footer } from '../siteStructures/footer/footer';
import './profile.scss';
import { Form } from '@unform/web';
import { InputCS } from '../../Forms/input';

export const Profile = () => {
  const formRef = useRef<any>();
  const user = JSON.parse(localStorage.getItem('userid') || '{}');
  const [fetchedData, setFetchedData] = useState<User[]>([]);
  useEffect(() => {
    Userservice()
      .getById(user)
      .then((res) => {
        formRef.current.setData(res.data);
      });
  }, []);

  const handleSubmit = (data: any) => {
    Userservice().update(user, data);
  };
  return (
    <div>
      <Header />
      <div className='container MainProfile'>
        <div className='body'>
          <h1>Perfil</h1>
          <Form onSubmit={handleSubmit} className='form-group ' ref={formRef}>
            <InputCS
              name='email'
              className={`w-50 form-control mt-3 `}
              placeholder='E-mail'
              readOnly
            />
            <InputCS
              name='name'
              className={`w-50 form-control mt-3 $`}
              placeholder='Nome'
            />
            <InputCS
              name='password'
              className={`w-50 form-control mt-3 $`}
              placeholder='Senha'
              type='password'
            />

            <button className='btn btn-success rounded mt-3 w-50' type='submit'>
              Atualizar
            </button>
          </Form>
        </div>
      </div>

      <Footer />
    </div>
  );
};
