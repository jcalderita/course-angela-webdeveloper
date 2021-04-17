// import React, { useState } from 'react';
import React from 'react';

function ToDoItem(props) {
  // const [isDone, setIsDone] = useState(false);
  // const handleClick = () => setIsDone((prev) => !prev);

  return (
    // <li onClick={handleClick} style={{ textDecoration: isDone && 'line-through' }}>
    <li onClick={() => props.onChecked(props.id)}>{props.text}</li>
  );
}

export default ToDoItem;
