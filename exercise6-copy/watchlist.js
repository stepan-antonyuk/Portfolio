// Write your netid here: sxa210264

// Implement the watchlist display and Remove functionality in this file.
"use strict";

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
    const watchlist_list = document.getElementById("movieList");

    const body = document.createElement("div");
    const text = document.createTextNode("Watchlist is empty.");
    body.appendChild(text);
    watchlist_list.appendChild(body);
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

    const poster = getMoviePoster(movie_info.Poster);

    const list = getMovieInfoList(movie_info);

    const watchlist_remove_button = getRemoveFromWatchlistButton(movie_info);

    card.appendChild(poster);
    card.appendChild(list);
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

function getRemoveFromWatchlistButton(movie_info) {
    const button = document.createElement("button");

    button.id = "watchlist-list-remove-from-watchlist-button";
    button.type = "button";
    button.textContent = "Remove from Watchlist";

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
