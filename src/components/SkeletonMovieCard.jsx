import Skeleton from 'react-loading-skeleton';
import '../css/MovieCard.css';

function SkeletonMovieCard() {
  return (
    <div className="movie-card">
      {/* Kerangka untuk gambar poster */}
      <Skeleton height={350} />
      <div className="movie-card-info">
        <h3 className="movie-card-title">
          {/* Kerangka untuk judul */}
          <Skeleton count={2} /> 
        </h3>
      </div>
    </div>
  );
}

export default SkeletonMovieCard;