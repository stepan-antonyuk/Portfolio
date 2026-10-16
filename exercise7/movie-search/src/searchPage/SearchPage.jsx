import { useState, useEffect } from 'react'
import './SearchPage.css'
import '../movieCard/MovieCard.jsx'
import MovieCard from '../movieCard/MovieCard.jsx';

const API_KEY = "3787d80a";

function SearchPage() {
    const [infoMessage, setInfoMessage] = useState('')
    const [searchText, setSearchText] = useState('')
    const [movies, setMovies] = useState([])

    const handleChange = (event) => {
        setSearchText(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setMovies([])

        const title = searchText.replace(/\s+/g, ' ').trim();

        if(!title) {
            setInfoMessage("Empty title!");
            return;
        }

        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(title)}`);

            if (!response.ok) {
                throw new Error('Bad Response!');
            }

            const movie_info = await response.json();

            if (movie_info.Response === "False") {
                setInfoMessage(movie_info.Error);
                return;
            }

            setMovies([...movie_info.Search])
            setInfoMessage('')
        } catch (error) {
            console.error(error.message);
            setInfoMessage("Could not load movies. Please try again later.");
        }
    }

    return (
        <>
            <main>
                <form
                    class="search"
                    id="searchForm"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        id="searchInput"
                        value={searchText}
                        onChange={handleChange}
                    />
                    <button type="submit" id="searchBtn">Search</button>
                </form>

                <p id="message" class="message">{infoMessage}</p>

                <section class="movie-list" id="movieList">
                    {movies.map((movie) => (
                        <MovieCard
                            setInfoMessage={setInfoMessage}
                            imdbID={movie.imdbID}
                            poster={movie.Poster}
                            title={movie.Title}
                            year={movie.Year}
                            type={movie.Type}
                        />
                    ))}
                </section>
            </main>
        </>
    )
}

export default SearchPage
