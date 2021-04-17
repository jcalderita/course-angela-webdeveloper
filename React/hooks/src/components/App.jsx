import React, { useState } from 'react';
let count = 0;

function App() {
  const [count, setCount] = useState(0);

  const add = () => setCount(count + 1);
  const reduce = () => setCount(count - 1);

  return (
    <div className="container">
      <h1>{count}</h1>
      <button onClick={add}>+</button>
      <button onClick={reduce}>-</button>
    </div>
  );
}

export default App;
