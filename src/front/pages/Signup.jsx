import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/authService';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    const res = await signup(email, password);
    if (res.msg === 'Usuario creado') {
      nav('/login');
    } else {
      alert(res.msg);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Registro</h2>
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
      <button type="submit">Registrarse</button>
    </form>
  );
}