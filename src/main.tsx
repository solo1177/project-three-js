import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Penguins from './Penguins.tsx'
import InteractiveParticles from './InteractiveParticles';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <Penguins />
  </React.StrictMode>,
)
