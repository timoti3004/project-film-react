import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Pastikan CSS diimpor
import '../css/MovieDetailSkeleton.css'; // CSS kustom untuk tata letak

function MovieDetailSkeleton() {
  return (
    <div className="movie-detail-page">
      <div className="movie-detail-container">
        {/* === Kerangka untuk Poster === */}
        <div className="detail-poster-skeleton">
          <Skeleton height="100%" />
        </div>

        {/* === Kerangka untuk Info Film === */}
        <div className="detail-info-skeleton">
          <h1><Skeleton width="60%" /></h1>
          <p className="tagline-skeleton"><Skeleton width="80%" /></p>
          <div className="meta-skeleton"><Skeleton width="50%" /></div>
          <div className="genres-skeleton">
            <Skeleton width={70} height={30} style={{ marginRight: 10 }} inline />
            <Skeleton width={90} height={30} style={{ marginRight: 10 }} inline />
            <Skeleton width={80} height={30} inline />
          </div>
          <h2><Skeleton width="30%" /></h2>
          <p><Skeleton count={3} /></p>
          <div className="button-skeleton">
            <Skeleton height={45} width={180} />
          </div>
        </div>
      </div>

      {/* === Kerangka untuk Pemeran === */}
      <div className="detail-section">
        <h2><Skeleton width={200} /></h2>
        <div className="cast-container">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="cast-card-skeleton">
              <Skeleton circle height={130} width={130} />
              <strong><Skeleton width={100} /></strong>
              <span><Skeleton width={80} /></span>
            </div>
          ))}
        </div>
      </div>

      {/* === Kerangka untuk Film Serupa === */}
      <div className="detail-section">
        <h2><Skeleton width={250} /></h2>
        <div className="movies-grid">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="movie-card-skeleton">
              <Skeleton height={300} />
              <h3><Skeleton /></h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailSkeleton;