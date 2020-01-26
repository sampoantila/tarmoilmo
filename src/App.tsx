import React from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <h3>Tarmo ilmo</h3>
      </div>
      <footer>
        &copy; 2020 DataCodex
      </footer>
    </div>
  );
}

export default App;
