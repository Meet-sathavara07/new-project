/* eslint-disable no-unused-vars */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app';
import './style.scss';

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById('app'));

function RootComponent() {
  return (
    <Router>
      <App />
    </Router>
  );
}

root.render(<RootComponent />);
