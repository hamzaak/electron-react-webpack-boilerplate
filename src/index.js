import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';

ReactDOM.render(
  <div>
    <Home />
  </div>,
  document.getElementById('app')
);

module.hot.accept();