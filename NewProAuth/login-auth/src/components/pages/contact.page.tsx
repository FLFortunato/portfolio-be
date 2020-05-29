import React, { useState } from 'react';

export const ContactPage = () => {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = () => {
    const data = { text, name, email, subject };
    console.log(data);
  };
  return (
    <div>
      <form action=''>
        <textarea
          name=''
          id=''
          cols={30}
          rows={10}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type='text'
          placeholder='Nome'
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type='text'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='text'
          placeholder='Assunto'
          onChange={(e) => setSubject(e.target.value)}
        />
      </form>
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};
