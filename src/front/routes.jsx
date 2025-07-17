import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

// Nuevos componentes de autenticación
import Signup from "./pages/Signup";
import Login  from "./pages/Login";
import Private from "./pages/Private";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={<h1>Not found!</h1>}
    >
      {/* Rutas públicas */}
      <Route index element={<Home />} />
      <Route path="single/:theId" element={<Single />} />
      <Route path="demo" element={<Demo />} />

      {/* Autenticación */}
      <Route path="signup" element={<Signup />} />
      <Route path="login"  element={<Login />} />

      {/* Ruta privada: redirige a /login si no hay token */}
      <Route
        path="private"
        element={
          sessionStorage.getItem("jwt-token")
            ? <Private />
            : <Navigate to="/login" replace />
        }
      />
    </Route>
  )
);