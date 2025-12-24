import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MangaList from './pages/MangaList';
import MangaDetail from './pages/MangaDetail';
import CuisineList from './pages/CuisineList';
import CuisineDetail from './pages/CuisineDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mangas" element={<MangaList />} />
          <Route path="/mangas/:id" element={<MangaDetail />} />
          <Route path="/cuisines" element={<CuisineList />} />
          <Route path="/cuisines/:id" element={<CuisineDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
