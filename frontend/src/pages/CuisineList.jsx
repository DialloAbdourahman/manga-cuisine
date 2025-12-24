import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CuisineList() {
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCuisines();
  }, []);

  const fetchCuisines = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/cuisines');
      if (!response.ok) {
        throw new Error('Failed to fetch cuisines');
      }
      const result = await response.json();
      setCuisines(result.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/cuisines/${id}`);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading cuisines...</div>
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
        <h1>🍽️ World Cuisines</h1>
        <p>Click on any cuisine to view details</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Cuisine</th>
            <th>Origin</th>
            <th>Difficulty</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {cuisines.map((cuisine) => (
            <tr key={cuisine.id} onClick={() => handleRowClick(cuisine.id)}>
              <td><strong>{cuisine.name}</strong></td>
              <td>{cuisine.origin}</td>
              <td>
                <span className={`badge ${
                  cuisine.difficulty === 'Easy' ? 'badge-success' : 
                  cuisine.difficulty === 'Medium' ? 'badge-warning' : 
                  'badge-info'
                }`}>
                  {cuisine.difficulty}
                </span>
              </td>
              <td>⭐ {cuisine.popularity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CuisineList;
