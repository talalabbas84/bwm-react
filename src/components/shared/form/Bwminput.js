import React from 'react';

export const BwmInput = ({
  input,
  label,
  type,
  className,
  meta: { touched, error, warning }
}) => (
  <div className='form-group'>
    <label>{label}</label>
    <div className='input-group'></div>
    <input {...input} type={type} className={className} />
    {touched && error && <div className='alert alert-danger'>{error}</div>}
  </div>
);
