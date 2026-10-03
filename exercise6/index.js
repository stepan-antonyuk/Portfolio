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

async function fetchMovieByTitle(title) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);

        if (!response.ok) {
            throw new Error('Bad Response!');
        }

        const movie_info = await response.json();
        createMovieCard(movie_info);
    } catch (error) {
        console.error(error.messaage);
    }
}

function createMovieCard(movie_info) {
    const preview = document.getElementById("search-preview");
    preview.replaceChildren();

    const card = document.createElement("div");

    const poster = document.createElement("div");
    const poster_img = document.createElement("img");
    poster_img.src = movie_info.Poster;
    poster_img.alt = movie_info.Title;
    poster.appendChild(poster_img);

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

    card.appendChild(poster);
    card.appendChild(list);

    preview.appendChild(card);
}
