import React, { useState, useEffect } from 'react';

import './App.css';

import GetContract from './GetContract'

function App() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  })


  return (
    <div className="App">
      <header className="App-header">
        <h1>Fábio clicked {count} times!</h1>
        <button onClick={()=> setCount(count + 1)}>Click me</button>
      </header>
      <GetContract></GetContract>
    </div>
  );
}

export default App;
