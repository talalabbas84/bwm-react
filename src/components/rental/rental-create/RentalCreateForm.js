import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { BwmInput } from '../../shared/form/Bwminput';
import { BwmTextArea } from '../../shared/form/BwmTextArea';
import { BwmSelect } from '../../shared/form/BwmSelect';
import BwmFileUpload from '../../shared/form/BwmFileUpload';
import { BwmResError } from '../../shared/form/BwmResError';
//import { required, minLength4 } from '../shared/form/validators';

const RentalCreateForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    submitCb,
    valid,
    options,
    errors
  } = props;

  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name='title'
        type='text'
        className='form-control'
        label='Title'
        component={BwmInput}
      />
      <Field
        name='description'
        type='text'
        rows='6'
        className='form-control'
        label='Description'
        component={BwmTextArea}
      />
      <Field
        name='city'
        type='text'
        className='form-control'
        label='City'
        component={BwmInput}
      />
      <Field
        name='street'
        type='text'
        className='form-control'
        label='Street'
        component={BwmInput}
      />
      <Field
        options={options}
        name='category'
        className='form-control'
        label='Category'
        component={BwmSelect}
      />
      <Field name='image' label='Image' component={BwmFileUpload} />

      <Field
        name='bedrooms'
        type='number'
        className='form-control'
        label='Bedrooms'
        component={BwmInput}
      />

      <Field
        name='dailyRate'
        type='text'
        className='form-control'
        label='Daily Rate'
        symbol='$'
        component={BwmInput}
      />
      <Field
        name='shared'
        type='checkbox'
        className='form-control'
        label='Shared'
        component={BwmInput}
      />
      <button
        className='btn btn-bwm btn-form'
        type='submit'
        disabled={!valid || pristine || submitting}
      >
        Create Rental
      </button>
      {errors && <BwmResError errors={errors} />}
    </form>
  );
};

export default reduxForm({
  // a unique name for the form
  form: 'rentalCreateForm',
  initialValues: { shared: false, category: 'apartment' }
})(RentalCreateForm);
