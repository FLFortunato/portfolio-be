import React, { useEffect, useState, useRef } from 'react';
import { Post } from '../../../../models/post.model';
import { PostServices } from '../../../../services/post.service';
import { Form } from '@unform/web';
import { InputCS } from '../../../Forms/input';
import { TextAreaCS } from '../../../Forms/textarea';
import { EditModal } from '../posts/modal';

export const Posts = () => {
  const formRef = useRef<any>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [reloadList, setReloadList] = useState([{}]);
  const [type, setType] = useState(Number);
  const userId = JSON.parse(localStorage.getItem('userid') || '{}');

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
  }, [reloadList]);

  const handleForm = (data: any) => {
    if (data.content.length == 0) {
      return;
    } else {
      PostServices()
        .create(
          { title: data.title, type: type, content: data.content },
          userId
        )
        .then((res) => {
          setReloadList([...reloadList, { data }]);
        });
    }
  };

  const deletePost = (id: any) => {
    PostServices().remove(id);
    setReloadList([]);
  };
  const postHtml = (
    <Form onSubmit={handleForm} ref={formRef} id='formid'>
      <InputCS
        name='title'
        placeholder='Titúlo'
        className='form-control w-50 mt-3'
      />
      <div className='d-flex mt-3 '>
        <select
          name='type'
          form='formid'
          onChange={(e) => selectType(e.target.value)}
          className='form-control w-50'
        >
          <option value='1'>Elogio</option>
          <option value='0'>Crítica</option>
        </select>
      </div>
      <TextAreaCS
        placeholder='Comentário'
        className='form-control w-50 mt-3'
        rows={5}
        name='content'
        form='formid'
      />
      <button type='submit' className='btn btn-success my-3'>
        Enviar
      </button>
    </Form>
  );

  return (
    <div className='container'>
      <div className=''>
        <h3>Posts</h3>
      </div>
      {postHtml}
      {posts.map((p) => {
        return (
          <div key={p.id} className='my-3 border p-4'>
            <h6>{p.title}</h6>
            <p
              style={p.type === 1 ? { color: 'blue' } : { color: 'red' }}
              className='mt-4'
            >
              {p.content}
            </p>
            {p.userPostId == userId ? (
              <div className='d-flex'>
                <EditModal data={p.id} />
                <button
                  className='btn btn-danger ml-3'
                  title='Excluir'
                  onClick={() => deletePost(p.id)}
                >
                  <span className='material-icons'>delete_outline</span>
                </button>
              </div>
            ) : undefined}
          </div>
        );
      })}
    </div>
  );
};
