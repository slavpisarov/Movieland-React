import { useState, useEffect } from "react";
import MovieCard from "./MovieCard.jsx";

import './App.css';
import SearchIcon from './search.svg'

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=c6be520d'

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        searchMovies('Spiderman')
    }, []);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }


    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0 ? (
                        <div className="container">
                            {movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie ={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )}
        </div>
    )
}

export default App;

