import React, { useState, useEffect } from 'react';

import './App.css';

import HelloWorld from './HelloWorld'

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
      <HelloWorld></HelloWorld>
    </div>
  );
}

export default App;
