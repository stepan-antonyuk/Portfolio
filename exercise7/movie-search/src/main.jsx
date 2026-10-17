import { StrictMode } from 'react'
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider  } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import SearchPage from './searchPage/SearchPage.jsx'
import WatchlistPage from './watchlistPage/WatchlistPage.jsx'

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    index: true,
                    element: <SearchPage />
                },
                {
                    path: "watchlist",
                    element: <WatchlistPage />
                }
            ]
        }
    ]
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
