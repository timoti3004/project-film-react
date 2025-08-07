import React from 'react';
import '../css/AboutPages.css';
import tmdbLogo from '../assets/tmdb_logo.png';

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <div className="about-card">
        <h1 className="app-title">TimoMovie</h1>
        <p className="app-version">Versi 1.0.0</p>
        
        <p className="app-description">
        This web application is designed to help you discover and explore 
        the world of movies with a clean and modern interface.
        </p>
        
        <p className="developer-credit">
          Made with ❤️ by <strong>Timotius Ginting</strong>
        </p>
        
        {/* Garis pemisah */}
        <hr className="separator" />
        
        <div className="attribution-section">
          <h2>Attribution</h2>
          <p>All movie data, TV series, and images in this application are provided by:</p>
          
          <img src={tmdbLogo} alt='The Movie Database Logo' className='tmdb-logo' />
          
          <p className="tmdb-notice">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;