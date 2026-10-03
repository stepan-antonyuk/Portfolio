// Write your netid here: sxa210264

// Implement the movie search and Add to Watchlist functionality in this file.
"use strict";

const API_KEY = "3787d80a";

function attachSearchToSearchButton() {
    const button = document.getElementById("searchBtn");
    button.addEventListener(
        'click', () => {
            const title = document.getElementById("searchInput").value;
            fetchMovieByTitle(title);
        }
    )
}

async function fetchMovieByTitle(movie_title) {
    const title = movie_title.replace(/\s+/g, ' ').trim();

    if(!title) {
        console.log("Empty title!");
        alert("Empty title!");
        return;
    }

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);

        if (!response.ok) {
            throw new Error('Bad Response!');
        }

        const movie_info = await response.json();
        showMovie(movie_info);
    } catch (error) {
        console.error(error.message);
    }
}

function showMovie(movie_info) {
    if (movie_info.Response === "False") {
        alert(movie_info.Error);
        return;
    }

    createMovieCard(movie_info);
}

function createMovieCard(movie_info) {
    const preview = document.getElementById("movieList");
    //preview.replaceChildren();

    const card = document.createElement("div");

    const poster = getMoviePoster(movie_info.Poster);

    const list = getMovieInfoList(movie_info);

    const watchlist_button = getWatchListButton(movie_info);

    card.appendChild(poster);
    card.appendChild(list);
    card.appendChild(watchlist_button);

    preview.appendChild(card);
}

function getMoviePoster(movie_poster) {
    if (movie_poster === "N/A") {
        return document.createDocumentFragment();
    }
    const poster = document.createElement("div");
    const poster_img = document.createElement("img");
    poster_img.src = movie_poster;
    poster_img.alt = "Movie Poster Here";
    poster.appendChild(poster_img);

    return poster;
}

function getMovieInfoList(movie_info) {
    const list = document.createElement("ul")

    const title = document.createElement("li");
    const title_text = document.createTextNode(movie_info.Title);
    title.appendChild(title_text);

    const year = document.createElement("li");
    const year_text = document.createTextNode(movie_info.Year);
    year.appendChild(year_text);

    const type = document.createElement("li");
    const type_text = document.createTextNode(movie_info.Type);
    type.appendChild(type_text);

    list.appendChild(title);
    list.appendChild(year);
    list.appendChild(type);

    return list;
}

function getWatchListButton(movie_info) {
    const button = document.createElement("button");

    button.id = "search-preview-watchlist-button";
    button.type = "button";
    button.textContent = "Add to Watchlist";

    button.addEventListener(
        'click', () => {
            let watchlist = JSON.parse(localStorage.getItem("watchlist"));

            if (watchlist == null) {
                watchlist = [];
            }

            if (watchlist.some(another_movie => another_movie.imdbID === movie_info.imdbID)) {
                alert("This movie is already in watchlist");
                return;
            }

            const movie ={
                imdbID: movie_info.imdbID,
                Poster: movie_info.Poster,
                Title: movie_info.Title,
                Year: movie_info.Year,
                Type: movie_info.Type,
                Response: movie_info.Response
            }

            watchlist.push(movie);
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
        }
    )

    return button;
}
