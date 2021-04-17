import React, { useState } from 'react';

function InputArea(props) {
  const [inputText, setInputText] = useState('');

  const handleChange = (event) => setInputText(event.target.value);

  return (
    <div className="form">
      <input onChange={handleChange} type="text" value={inputText} />
      <button
        onClick={() => {
          props.handleClick(inputText);
          setInputText('');
        }}
      >
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
