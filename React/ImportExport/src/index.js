import React from 'react';
import ReactDOM from 'react-dom';
import * as calculator from './calculator';
const root = document.getElementById('root');

ReactDOM.render(
  <ul>
    <li>{calculator.add(1, 2)}</li>
    <li>{calculator.multiply(2, 3)}</li>
    <li>{calculator.subtract(7, 2)}</li>
    <li>{calculator.divide(5, 2)}</li>
  </ul>,
  root
);
