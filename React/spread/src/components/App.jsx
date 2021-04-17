import React, { useState } from 'react';
import ToDoItem from './ToDoItem';
import InputArea from './InputArea';

function App() {
  const [items, setItems] = useState([]);

  const handleClick = (inputText) => setItems((prev) => [...prev, inputText]);

  const deleteItem = (id) =>
    setItems((prev) => {
      return prev.filter((e, i) => i !== id);
    });

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea handleClick={handleClick} />
      <div>
        <ul>
          {items.map((e, i) => (
            <ToDoItem key={i} id={i} text={e} onChecked={deleteItem} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
