import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export const Input = ({ name, ...rest }: any) => {
  const inputRef = useRef(null);
  const { fieldName, error, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({ name: fieldName, ref: inputRef.current, path: 'value' });
  }, [fieldName, registerField]);

  return (
    <div>
      <input ref={inputRef} {...rest} />
      {error ? <span style={{ color: '#f00' }}> {error}</span> : undefined}
    </div>
  );
};
