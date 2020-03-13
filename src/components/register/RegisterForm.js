import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { BwmInput } from '../shared/form/Bwminput';

const RegisterForm = props => {
  const { handleSubmit, pristine, reset, submitting, submitCb, valid } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name='username'
        component='input'
        type='text'
        className='form-control'
        label='Username'
        component={BwmInput}
      />

      <Field
        name='email'
        component='input'
        type='email'
        className='form-control'
        label='Email'
        component={BwmInput}
      />

      <Field
        name='password'
        component='input'
        type='password'
        className='form-control'
        label='Password'
        component={BwmInput}
      />

      <Field
        name='passwordConfirmation'
        component='input'
        type='password'
        className='form-control'
        label='Password Confirmation'
        component={BwmInput}
      />

      <button
        className='btn btn-bwm btn-form'
        type='submit'
        disabled={!valid || pristine || submitting}
      >
        Submit
      </button>
    </form>
  );
};

const validate = values => {
  const errors = {};
  if (!values.username || values.username.length < 4) {
    errors.username = 'Username min length is 4 characters';
  }
  if (!values.email) {
    errors.email = 'Please enter email';
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Please enter password confirmation';
  }
  if (values.passwordConfirmation !== values.password) {
    errors.password = 'Password must be the same';
  }
  //   if (!values.username) {
  //     errors.username = 'Required'
  //   } else if (values.username.length > 15) {
  //     errors.username = 'Must be 15 characters or less'
  //   }
  //   if (!values.email) {
  //     errors.email = 'Required'
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address'
  //   }
  //   if (!values.age) {
  //     errors.age = 'Required'
  //   } else if (isNaN(Number(values.age))) {
  //     errors.age = 'Must be a number'
  //   } else if (Number(values.age) < 18) {
  //     errors.age = 'Sorry, you must be at least 18 years old'
  //   }
  return errors;
};

export default reduxForm({
  // a unique name for the form
  form: 'registerForm',
  validate
})(RegisterForm);
