import { BACKEND_URL } from '../components/BackendURL';

export async function signup(email, password) {
  const resp = await fetch(`${BACKEND_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return resp.json();
}

export async function login(email, password) {
  const resp = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return resp.json();
}