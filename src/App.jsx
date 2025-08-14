import './css/App.css'
import Favorites from './pages/Favorites';
import Home from './pages/Home'
import NavBar from './components/NavBar';
import MovieDetail from './pages/MovieDetail'; 
import GenrePage from './pages/GenrePages';
import ActorDetail from './pages/ActorDetail';
import AboutPage from './pages/AboutPages';
import { Analytics } from "@vercel/analytics/react";
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
          <Route path="/person/:personId" element={<ActorDetail />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Analytics />
      </main>
    </MovieProvider>
  );
}

export default App
