import React from 'react';
import { BrowserRouter as Routes } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'macro-css';


ReactDOM.render(
  <React.StrictMode>
    <Routes>
      <App />
    </Routes>

  </React.StrictMode>,
  document.getElementById('root')
);
