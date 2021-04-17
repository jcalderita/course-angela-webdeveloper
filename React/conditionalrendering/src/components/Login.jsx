import React from 'react';
import Input from './Input';

export default function Login() {
  return (
    <form className="form">
      <Input type="text" placeholder="UserName" />
      <Input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
