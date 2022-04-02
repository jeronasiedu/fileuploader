import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import '@fontsource/nunito-sans'
import App from './App'
import { Toaster } from 'react-hot-toast'
ReactDOM.render(
  <React.StrictMode>
    <Toaster />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
