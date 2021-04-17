import React from 'react';
import Card from './Card';
import contacts from '../contacts';

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      {contacts.map((e) => {
        return <Card key={e.id} id={e.id} name={e.name} imgURL={e.imgURL} phone={e.phone} email={e.email} />;
      })}
    </div>
  );
}

export default App;
