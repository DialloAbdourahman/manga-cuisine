import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function CuisineDetail() {
  const { id } = useParams();
  const [cuisine, setCuisine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCuisineDetail();
  }, [id]);

  const fetchCuisineDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/cuisines/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cuisine details');
      }
      const result = await response.json();
      setCuisine(result.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading cuisine details...</div>
      </div>
    );
  }

  if (error || !cuisine) {
    return (
      <div className="container">
        <div className="error">Error: {error || 'Cuisine not found'}</div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/cuisines" className="btn btn-back">Back to Cuisine List</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/cuisines" className="btn btn-back">← Back to Cuisine List</Link>
      
      <div className="detail-card">
        <h2>🍽️ {cuisine.name} Cuisine</h2>
        
        <div className="detail-item">
          <strong>Origin:</strong> {cuisine.origin}
        </div>
        
        <div className="detail-item">
          <strong>Difficulty:</strong>
          <span className={`badge ${
            cuisine.difficulty === 'Easy' ? 'badge-success' : 
            cuisine.difficulty === 'Medium' ? 'badge-warning' : 
            'badge-info'
          }`}>
            {cuisine.difficulty}
          </span>
        </div>
        
        <div className="detail-item">
          <strong>Popularity:</strong> ⭐ {cuisine.popularity} / 10
        </div>
        
        <div className="detail-item">
          <strong>Popular Dishes:</strong>
          <div className="list-inline">
            {cuisine.popularDishes.map((dish, index) => (
              <span key={index} className="list-inline-item">{dish}</span>
            ))}
          </div>
        </div>
        
        <div className="detail-item">
          <strong>Key Characteristics:</strong> {cuisine.characteristics}
        </div>
        
        <div className="detail-item">
          <strong>Description:</strong>
          <p style={{ marginTop: '10px', lineHeight: '1.6' }}>{cuisine.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CuisineDetail;
