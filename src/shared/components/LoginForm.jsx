import React, { Component } from 'react';
import        { connect }   from 'react-redux'

import { Field, reduxForm, formValueSelector } from 'redux-form';

const LoginForm = (props) => {
  const { onLogin, handleSubmit } = props
  return (
    <form onSubmit={handleSubmit(values => onLogin(values.email))}>
      <Field name="email" component="input" type="email"/>
      <button type="submit">Login</button>
    </form>
  );
}
  
export default reduxForm({form: 'login'})(LoginForm)