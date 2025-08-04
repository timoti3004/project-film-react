import './css/App.css'
import Favorites from './pages/Favorites';
import Home from './pages/Home'
import NavBar from './components/NavBar';
import MovieDetail from './pages/MovieDetail'; 
import GenrePage from './pages/GenrePages';
import { MovieProvider } from './contexts/MovieContext';
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/favorites' element={<Favorites />}/>
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="/genre/:genreId/:genreName" element={<GenrePage />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App
