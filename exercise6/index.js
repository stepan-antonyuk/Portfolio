"use strict";

const API_KEY = "3787d80a";

function attachSearchToSearchButton() {
    const button = document.getElementById("search-by-movie-title-button");
    button.addEventListener(
        'click', () => {
            const title = document.getElementById("t").value;
            fetchMovieByTitle(title);
        }
    )
}

async function fetchMovieByTitle(movie_title) {
    const title = movie_title.replace(/\s+/g, ' ').trim();

    if(!title) {
        console.log("Empty title!")
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
        console.error(error.messaage);
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
    const preview = document.getElementById("search-preview");
    //preview.replaceChildren();

    const card = document.createElement("div");

    const poster = getMoviePoster(movie_info.Poster);

    const list = getMovieInfoList(movie_info);

    card.appendChild(poster);
    card.appendChild(list);

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
