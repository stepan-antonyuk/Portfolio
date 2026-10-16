import { useState, useEffect } from 'react'
import './WatchlistPage.css'
import '../movieCard/MovieCard.jsx'
import MovieCard from '../movieCard/MovieCard.jsx';

function WatchlistPage() {

    const [watchlist, setWatchlist] = useState([])

    useEffect(() => {
        const localStorageWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        setWatchlist(localStorageWatchlist)
    }, [])

    const infoMessage = watchlist.length === 0 ? "Watchlist is empty." : ''

    return(
        <>
            <main>
                <p id="message" className="message">{infoMessage}</p>

                <section className="movie-list" id="movieList">
                    {watchlist.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            addButton={false}
                            setWatchlist={setWatchlist}
                            imdbID={movie.imdbID}
                            poster={movie.poster}
                            title={movie.title}
                            year={movie.year}
                            type={movie.type}
                        />
                    ))}
                </section>
            </main>
        </>
    )
}

export default WatchlistPage
