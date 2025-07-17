import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.token) {
      sessionStorage.setItem('jwt-token', res.token);
      nav('/private');
    } else {
      alert(res.msg);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}