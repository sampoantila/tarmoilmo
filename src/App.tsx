import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const App: React.FC = () => {
  const [email, setEmail] = useState('');

  const onSubmit = (event: any) => {
    console.log('Form data: ', email);
    axios.get(`http://localhost:4000/api/v1/authenticate/${email}`);
  }

  const handleChange = (event: any) => {
    setEmail(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        Tarmo-ilmo
      </header>
      <form onSubmit={onSubmit} >
        <input type="text" name="email" onChange={handleChange} value={email} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
