import React from 'react';

function App() {
  const [state, setState] = React.useState();

  // let time = new Date().toLocaleTimeString();

  setInterval(() => {
    setState(new Date().toLocaleTimeString());
  }, 1000);

  return (
    <div className="container">
      <h1>{state}</h1>
    </div>
  );
}

export default App;
