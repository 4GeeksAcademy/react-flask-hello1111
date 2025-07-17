import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';                    // Estilos globales
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';       // Configuración de rutas
import { StoreProvider } from './hooks/useGlobalReducer';
import { BACKEND_URL } from './components/BackendURL';

const Main = () => {
  // Opcional: ver en consola qué backend URL está usando
  console.log('Usando API backend en:', BACKEND_URL);

  return (
    <React.StrictMode>
      {/* Provee estado global */}
      <StoreProvider>
        {/* Inicia el enrutador */}
        <RouterProvider router={router} />
      </StoreProvider>
    </React.StrictMode>
  );
};

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<Main />);