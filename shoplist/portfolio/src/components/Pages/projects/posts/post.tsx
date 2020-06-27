import React, { useEffect, useState, useRef } from 'react';
import { Post } from '../../../../models/post.model';
import { PostServices } from '../../../../services/post.service';
import { Form } from '@unform/web';
import { InputCS } from '../../../Forms/input';
import { TextAreaCS } from '../../../Forms/textarea';

export const Posts = () => {
  const formRef = useRef<any>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [type, setType] = useState(Number);

  const selectType = (data: any) => {
    if (data === '1') {
      setType(1);
    } else {
      setType(0);
    }
  };

  useEffect(() => {
    PostServices()
      .get()
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  const handleForm = (data: any) => {
    const userId = JSON.parse(localStorage.getItem('userid') || '{}');
    PostServices()
      .create({ title: data.title, type: type, content: data.content }, userId)
      .then((res) => {
        console.log(res.data);
      });
  };
  const postHtml = (
    <Form onSubmit={handleForm} ref={formRef} id='formid'>
      <InputCS
        name='title'
        placeholder='Titúlo'
        className='form-control w-25 mt-3'
      />
      <div className='d-flex mt-3 '>
        <select
          name='type'
          form='formid'
          onChange={(e) => selectType(e.target.value)}
        >
          <option value='1'>Elogio</option>
          <option value='0'>Crítica</option>
        </select>
      </div>
      <TextAreaCS
        className='form-control w-25 mt-3'
        rows={5}
        name='content'
        form='formid'
      />
      <button type='submit'>Enviar</button>
    </Form>
  );
  return (
    <div className='container'>
      {postHtml}
      {posts.map((p) => {
        return (
          <div key={p.id}>
            <h6>{p.title}</h6>
            <p>{p.content}</p>
          </div>
        );
      })}
    </div>
  );
};
