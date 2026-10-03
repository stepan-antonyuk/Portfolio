// Write your netid here: sxa210264

// Implement the watchlist display and Remove functionality in this file.
"use strict";
showWatchlist();

function showMessage(messasge) {
    const body = document.getElementById("message");
    body.textContent = messasge;
}

function clearMessage() {
    const body = document.getElementById("message");
    body.replaceChildren();
}

function showWatchlist() {
    const watchlist_list = document.getElementById("movieList");
    watchlist_list.replaceChildren();

    const watchlist = JSON.parse(localStorage.getItem("watchlist"));

    if (!watchlist?.length) {
        createWatchlistIsEmpty();
        return
    }

    createWatchlistCards(watchlist);
}

function createWatchlistIsEmpty() {
    //const watchlist_list = document.getElementById("movieList");

    //const body = document.createElement("div");
    //const text = document.createTextNode("Watchlist is empty.");
    //body.appendChild(text);
    //watchlist_list.appendChild(body);
    showMessage("Watchlist is empty.");
}

function createWatchlistCards(watchlist) {
    for (let i = 0; i < watchlist.length; i++) {
        const movie_info = watchlist[i];
        createMovieCard(movie_info);
    }
}

function createMovieCard(movie_info) {
    const watchlist_list = document.getElementById("movieList");

    const card = document.createElement("div");
    card.classList.add("movie-card");

    const poster = getMoviePoster(movie_info.Poster);

    const info = getMovieInfo(movie_info);

    const watchlist_remove_button = getRemoveFromWatchlistButton(movie_info);

    card.appendChild(poster);
    card.appendChild(info);
    card.appendChild(watchlist_remove_button);

    watchlist_list.appendChild(card);
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

function getRemoveFromWatchlistButton(movie_info) {
    const button = document.createElement("button");

    button.classList.add("remove-btn");
    button.type = "button";
    button.textContent = "Remove";

    button.addEventListener(
        'click', () => {
            let watchlist = JSON.parse(localStorage.getItem("watchlist"));

            let new_watchlist = watchlist.filter(another_movie => another_movie.imdbID != movie_info.imdbID);

            localStorage.setItem("watchlist", JSON.stringify(new_watchlist));
            showWatchlist();
        }
    )

    return button;
}
