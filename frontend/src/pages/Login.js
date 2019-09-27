import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ history }) {
  const [username, setUsername] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/users', {
      username,
    });

    const { _id } = response.data;

    history.push(`/user/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="DivApt"/>
        <input 
          placeholder="Email"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input 
          placeholder="Senha"
          
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}