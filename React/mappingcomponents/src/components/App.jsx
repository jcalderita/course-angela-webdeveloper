import React from 'react';
import Entry from './Entry';
import emojipedia from '../emojipedia';

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojipedia.map((e) => {
          return <Entry key={e.id} emoji={e.emoji} name={e.name} description={e.meaning} />;
        })}
      </dl>
    </div>
  );
}

export default App;
