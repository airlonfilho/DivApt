import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ history }) {
  const [username, setUsername] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/usuarios', {
      username,
    });

    const { _id } = response.data;

    history.push(`/usuario/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="DivApt" width="150px"/>
        <h2> DivApt</h2>
        <span> Encontre alguém que combine com você</span>
        <input 
          placeholder="Digite seu usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input type="password"
          placeholder="Digite sua senha"
          />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}