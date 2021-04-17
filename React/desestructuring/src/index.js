// CHALLENGE: uncomment the code below and see the car stats rendered
import React from 'react';
import ReactDOM from 'react-dom';
import cars from './practice';
const root = document.getElementById('root');

const [honda, tesla] = cars.map((e) => ({ model: e.model, TopSpeed: e.speedStats.topSpeed, TopColour: e.coloursByPopularity[0] }));

ReactDOM.render(
  <table>
    <thead>
      <tr>
        <th>Brand</th>
        <th>Top Speed</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{tesla.model}</td>
        <td>{tesla.TopSpeed}</td>
        <td>{tesla.TopColour}</td>
      </tr>
      <tr>
        <td>{honda.model}</td>
        <td>{honda.TopSpeed}</td>
        <td>{honda.TopColour}</td>
      </tr>
    </tbody>
    <tfoot></tfoot>
  </table>,
  root
);
