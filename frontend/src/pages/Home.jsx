import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <div className="header">
        <h1>🎌 Manga & Cuisines Explorer 🍜</h1>
        <p>Discover amazing manga series and world cuisines</p>
      </div>
      
      <div className="button-group">
        <Link to="/mangas" className="btn btn-primary">
          📚 Explore Mangas
        </Link>
        <Link to="/cuisines" className="btn btn-secondary">
          🍽️ Explore Cuisines
        </Link>
      </div>

      <div style={{ marginTop: '60px', textAlign: 'center', color: '#666' }}>
        <h3>Welcome!</h3>
        <p style={{ marginTop: '15px', lineHeight: '1.6' }}>
          This application showcases a microservices architecture with two independent services:
          <br />
          <strong>Manga Service</strong> (Port 3001) and <strong>Cuisine Service</strong> (Port 3002)
        </p>
      </div>
    </div>
  );
}

export default Home;
