import React from 'react';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
