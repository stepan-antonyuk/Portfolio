import './MovieCard.css'

function MoviePoster({ poster }) {
    if (poster === "N/A") {
        return(<></>)
    }

    return (
        <>
            <div>
                <img src={poster} alt='Movie Poster Here' />
            </div>
        </>
    )
}

function MovieInfo({ title, year, type }) {
    return (
        <>
            <div className='movie-info'>
                <h5>
                    {title}
                </h5>
                <p>
                    {year}
                </p>
                <label>
                    {type}
                </label>
            </div>
        </>
    )
}

function AddWatchlistButton({
    setInfoMessage,
    imdbID,
    poster,
    title,
    year,
    type
}) {
    const handleOnClick = () => {
        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

        if (watchlist.some(otherMovie => otherMovie.imdbID === imdbID)) {
            setInfoMessage(`${title} is already in watchlist`);
            return;
        }

        const movie ={
            imdbID,
            poster,
            title,
            year,
            type,
        }

        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        setInfoMessage(`${title} added to watchlist`);
    }

    return (
        <>
            <button className='add-btn' type='button' onClick={handleOnClick}>
                +Watchlist
            </button>
        </>
    )
}

function RemoveWatchlistButton({
    imdbID,
    setWatchlist
}) {
    const handleOnClick = () => {
        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        let newWatchlist = watchlist.filter(otherMovie => otherMovie.imdbID != imdbID);
        localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
        setWatchlist([...newWatchlist])
    }

    return (
        <>
            <button className='remove-btn' type='button' onClick={handleOnClick}>
                Remove
            </button>
        </>
    )
}

function MovieCard({
    addButton=true,
    setWatchlist=() => {},
    setInfoMessage=() => {},
    imdbID,
    poster,
    title,
    year,
    type
}) {
    return (
        <>
            <div className='movie-card'>
                <MoviePoster poster={poster} />
                <MovieInfo title={title} year={year} type={type} />
                { addButton
                    ? <AddWatchlistButton
                        setInfoMessage={setInfoMessage}
                        imdbID={imdbID}
                        poster={poster}
                        title={title}
                        year={year}
                        type={type}
                    />
                    : <RemoveWatchlistButton
                        imdbID={imdbID}
                        setWatchlist={setWatchlist}
                    />
                }
            </div>
        </>
    )
}

export default MovieCard
