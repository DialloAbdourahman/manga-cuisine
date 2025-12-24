import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MangaList() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMangas();
  }, []);

  const fetchMangas = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/mangas');
      if (!response.ok) {
        throw new Error('Failed to fetch mangas');
      }
      const result = await response.json();
      setMangas(result.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/mangas/${id}`);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading mangas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">Error: {error}</div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" className="btn btn-back">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" className="btn btn-back">← Back to Home</Link>
      
      <div className="header">
        <h1>📚 Manga Collection</h1>
        <p>Click on any manga to view details</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Status</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {mangas.map((manga) => (
            <tr key={manga.id} onClick={() => handleRowClick(manga.id)}>
              <td><strong>{manga.title}</strong></td>
              <td>{manga.author}</td>
              <td>{manga.genre}</td>
              <td>{manga.year}</td>
              <td>
                <span className={`badge ${manga.status === 'Ongoing' ? 'badge-success' : 'badge-info'}`}>
                  {manga.status}
                </span>
              </td>
              <td>⭐ {manga.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MangaList;
