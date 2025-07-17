import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../components/BackendURL';

export default function Private() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('jwt-token');
    fetch(`${BACKEND_URL}/api/auth/protected`, {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => nav('/login'));
  }, [nav]);

  const logout = () => {
    sessionStorage.removeItem('jwt-token');
    nav('/login');
  };

  if (!user) return <p>Cargando...</p>;
  return (
    <div>
      <h2>Bienvenido, {user.email}</h2>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}