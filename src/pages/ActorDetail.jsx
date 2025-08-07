import React, { useState, useEffect } from 'react';
import '../css/ActorDetail.css'
import ActorDetailSkeleton from '../components/ActorDetailSkeleton';
import { useParams, Link } from 'react-router-dom';
import { getActorDetails } from '../services/api'; //

function ActorDetail() {
  const { personId } = useParams();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  useEffect(() => {
    const fetchActor = async () => {
      try {
        setLoading(true);
        const data = await getActorDetails(personId);
        
        data.movie_credits.cast.sort((a, b) => {
            if (!a.release_date) return 1;
            if (!b.release_date) return -1;
            return new Date(b.release_date) - new Date(a.release_date);
        });

        setActor(data);
      } catch (err) {
        setError('Gagal memuat data aktor.');
      } finally {
        setLoading(false);
      }
    };
    fetchActor();
  }, [personId]);

  if (loading) return <ActorDetailSkeleton />;
  if (error) return <div className="error-state">{error}</div>;
  if (!actor) return null;

  const biographyToShow = isBioExpanded 
    ? actor.biography 
    : `${actor.biography.substring(0, 400)}...`;

  return (
    <div className="actor-detail-container">
      {/* Breadcrumbs bisa ditambahkan di sini */}
      <div className="actor-layout">
        <div className="actor-photo-column">
          <img 
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} 
            alt={actor.name} 
            className="actor-profile-pic"
          />
        </div>
        <div className="actor-info-column">
          <h1>{actor.name}</h1>
          <div className="actor-meta">
            <p><strong>Dikenal untuk:</strong> {actor.known_for_department}</p>
            <p><strong>Lahir:</strong> {actor.birthday} di {actor.place_of_birth}</p>
          </div>
          <h3>Biografi</h3>
          <p className="actor-biography">
            {biographyToShow}
            {actor.biography.length > 400 && (
              <button onClick={() => setIsBioExpanded(!isBioExpanded)} className="read-more-btn">
                {isBioExpanded ? 'Tutup' : 'Baca Selengkapnya'}
              </button>
            )}
          </p>
        </div>
      </div>
      
      <div className="filmography-section">
        <h2>Filmografi</h2>
        <div className="movie-grid">
          {actor.movie_credits.cast.map(movie => (
            <Link to={`/movie/${movie.id}`} key={movie.credit_id} className="movie-card-link">
              <div className="movie-card">
                <img 
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                  alt={movie.title} 
                  onError={(e) => { e.target.onerror = null; e.target.src='URL_GAMBAR_CADANGAN'; }}
                />
                <h4 className="movie-title">{movie.title}</h4>
                <p className="character-name">sebagai {movie.character}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActorDetail;