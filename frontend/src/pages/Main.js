import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.png';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import itsamatch from '../assets/itsamatch.png';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchUsuario, setMatchUsuario] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/usuarios', {
        headers: {
          user: match.params.id,
        }
      })

      setUsers(response.data);
    }

    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io('http://localhost:3338', {
      query: { user: match.params.id }
    });

    socket.on('match', usuario => {
      setMatchUsuario(usuario);
    })
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/usuarios/${id}/likes`, null, {
      headers: { user: match.params.id },
    })

    setUsers(users.filter(user => user._id !== id));
  }

  function chamanozap(){
    window.open('https://api.whatsapp.com/send?phone=5588996644768');
  }

  async function handleDislike(id) {
    await api.post(`/usuarios/${id}/dislikes`, null, {
      headers: { user: match.params.id },
    })

    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="DivApt" width="50px" />
      </Link>
      { users.length > 0 ? (
        <ul>  
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong> <span>{user.user}</span>
                <p>{user.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="Dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Não existe pessoas nessa cidade :(</div>
      ) }

      { matchUsuario && (
        <div className="match-container">
          <img src={itsamatch} alt="It's a match" />

          <img className="avatar" src={matchUsuario.avatar} alt=""/>
          <strong>{matchUsuario.name}</strong>
          <p>{matchUsuario.bio}</p>

          <button type="button" onClick={() => chamanozap()}>Chamar no zap</button>
        </div>
      ) }
    </div>
  )
}
