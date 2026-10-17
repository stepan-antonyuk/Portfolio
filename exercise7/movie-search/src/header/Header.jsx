import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function MovieSearch() {
    return(
        <>
            <h1>Movie Search</h1>
            <nav>
                <Link to="/watchlist"> My Watchlist</Link>
            </nav>
        </>
    )
}

function MyWatchlist() {
    return(
        <>
            <h1>My Watchlist</h1>
            <nav>
                <Link to="/">Movie Search</Link>
            </nav>
        </>
    )
}

function Header() {
    const { pathname } = useLocation()
    const searchPage = pathname === '/'

    return(
        <>
            <header>
                {searchPage
                    ? <MovieSearch />
                    : <MyWatchlist />
                }
            </header>
        </>
    )
}

export default Header
