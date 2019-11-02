import React from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {

  const onSubmit = (event: any) => {
    console.log('Form data: ', event.target);
  }

  return (
    <div className="App">
      <header className="App-header">
        Tarmo-ilmo
      </header>
      <form onSubmit={onSubmit} >
        <input type="text" name="email" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
