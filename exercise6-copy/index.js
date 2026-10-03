// Write your netid here: sxa210264

// Implement the movie search and Add to Watchlist functionality in this file.
"use strict";

const API_KEY = "3787d80a";
attachSearch();

function showMessage(messasge) {
    const body = document.getElementById("message");
    body.textContent = messasge;
}

function clearMessage() {
    const body = document.getElementById("message");
    body.replaceChildren();
}

function attachSearch() {
    const form = document.getElementById("searchForm");
    form.addEventListener(
        'submit', (event) => {
            event.preventDefault();
            const title = document.getElementById("searchInput").value;
            fetchMovieByTitle(title);
        }
    )
}

async function fetchMovieByTitle(movie_title) {
    const title = movie_title.replace(/\s+/g, ' ').trim();

    if(!title) {
        //console.log("Empty title!");
        //alert("Empty title!");
        showMessage("Empty title!");
        return;
    }

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`);

        if (!response.ok) {
            throw new Error('Bad Response!');
        }

        const movie_info = await response.json();
        showMovie(movie_info);
    } catch (error) {
        console.error(error.message);
        showMessage(error.message);
    }
}

function showMovie(movie_info) {
    if (movie_info.Response === "False") {
        //alert(movie_info.Error);
        showMessage(movie_info.Error);
        return;
    }

    for (const movie of movie_info.Search) {
        createMovieCard(movie);
    }
    clearMessage();
}

function createMovieCard(movie_info) {
    const preview = document.getElementById("movieList");
    //preview.replaceChildren();

    const card = document.createElement("div");
    card.classList.add("movie-card");

    const poster = getMoviePoster(movie_info.Poster);

    const info = getMovieInfo(movie_info);

    const watchlist_button = getWatchListButton(movie_info);

    card.appendChild(poster);
    card.appendChild(info);
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

function getMovieInfo(movie_info) {
    const body = document.createElement("div");
    body.classList.add("movie-info");

    const title = document.createElement("h5");
    const title_text = document.createTextNode(movie_info.Title);
    title.appendChild(title_text);

    const year = document.createElement("p");
    const year_text = document.createTextNode(movie_info.Year);
    year.appendChild(year_text);

    const type = document.createElement("label");
    const type_text = document.createTextNode(movie_info.Type);
    type.appendChild(type_text);

    body.appendChild(title);
    body.appendChild(year);
    body.appendChild(type);

    return body;
}

function getWatchListButton(movie_info) {
    const button = document.createElement("button");

    button.classList.add("add-btn");
    button.id = "search-preview-watchlist-button";
    button.type = "button";
    button.textContent = "+Watchlist";

    button.addEventListener(
        'click', () => {
            let watchlist = JSON.parse(localStorage.getItem("watchlist"));

            if (watchlist == null) {
                watchlist = [];
            }

            if (watchlist.some(another_movie => another_movie.imdbID === movie_info.imdbID)) {
                //alert("This movie is already in watchlist");
                showMessage(`${movie_info.Title} is already in watchlist`);
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
            showMessage(`${movie_info.Title} added to watchlist`);
        }
    )

    return button;
}
