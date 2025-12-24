import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function MangaDetail() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMangaDetail();
  }, [id]);

  const fetchMangaDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/mangas/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch manga details');
      }
      const result = await response.json();
      setManga(result.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading manga details...</div>
      </div>
    );
  }

  if (error || !manga) {
    return (
      <div className="container">
        <div className="error">Error: {error || 'Manga not found'}</div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/mangas" className="btn btn-back">Back to Manga List</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/mangas" className="btn btn-back">← Back to Manga List</Link>
      
      <div className="detail-card">
        <h2>📖 {manga.title}</h2>
        
        <div className="detail-item">
          <strong>Author:</strong> {manga.author}
        </div>
        
        <div className="detail-item">
          <strong>Genre:</strong> {manga.genre}
        </div>
        
        <div className="detail-item">
          <strong>Year:</strong> {manga.year}
        </div>
        
        <div className="detail-item">
          <strong>Volumes:</strong> {manga.volumes}
        </div>
        
        <div className="detail-item">
          <strong>Status:</strong>
          <span className={`badge ${manga.status === 'Ongoing' ? 'badge-success' : 'badge-info'}`}>
            {manga.status}
          </span>
        </div>
        
        <div className="detail-item">
          <strong>Rating:</strong> ⭐ {manga.rating} / 10
        </div>
        
        <div className="detail-item">
          <strong>Description:</strong>
          <p style={{ marginTop: '10px', lineHeight: '1.6' }}>{manga.description}</p>
        </div>
      </div>
    </div>
  );
}

export default MangaDetail;
