import React from 'react';
import '../css/ActorDetailSkeleton.css'; // Kita akan buat file CSS ini selanjutnya

const ActorDetailSkeleton = () => {
  return (
    <div className="actor-detail-container skeleton-container">
      <div className="actor-layout">
        <div className="actor-photo-column">
          {/* Placeholder untuk foto profil */}
          <div className="skeleton skeleton-image"></div>
        </div>
        <div className="actor-info-column">
          {/* Placeholder untuk nama aktor (judul besar) */}
          <div className="skeleton skeleton-title"></div>
          {/* Placeholder untuk meta data (lahir, tempat, dll) */}
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text short"></div>
          {/* Placeholder untuk biografi */}
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text medium"></div>
        </div>
      </div>
      
      <div className="filmography-section">
        {/* Placeholder untuk judul "Filmografi" */}
        <div className="skeleton skeleton-subtitle"></div>
        <div className="movie-grid">
          {/* Membuat 12 kartu film placeholder */}
          {Array.from({ length: 12 }).map((_, index) => (
            <div className="movie-card-skeleton" key={index}>
              <div className="skeleton skeleton-poster"></div>
              <div className="skeleton skeleton-text small"></div>
              <div className="skeleton skeleton-text tiny"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActorDetailSkeleton;