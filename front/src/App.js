import React from 'react';
import MovieList from './components/MovieList';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>OTT Movie Service</h1>
      {/* Login 컴포넌트 */}
      <Login />
      {/* MovieList 컴포넌트 */}
      <MovieList />
    </div>
  );
}

export default App;
