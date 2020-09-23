/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против...",
            "Ангелы"
        ],
    };

    const advertismentBlock = document.querySelector('.promo__adv'),
        poster = document.querySelector('.promo__bg'),
        filmGenre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addingMovieForm = document.querySelector('.add'),
        checkbox = addingMovieForm.querySelector('input[type="checkbox"]'),
        addingMovieInput = addingMovieForm.querySelector('.adding__input');

    const sortMovies = (movies) => {
        const sortedMovies = movies.map((movie) => {
            return movie.toUpperCase();
        }).sort();
        return sortedMovies;
    };

    const getDeleteBtns = (itemsList) => {
        return itemsList.querySelectorAll('.delete');
    };

    const deleteMovie = (event) => {
        const deleteBtn = event.target;
        const deleteMovieItem = deleteBtn.parentElement.textContent.trim().slice(3);
        const sortedMovies = sortMovies(movieDB.movies);

        const deleteMovieIndex = sortedMovies.indexOf(deleteMovieItem);

        const startMovieList = sortedMovies.slice(0, deleteMovieIndex);
        const endMovieList = sortedMovies.slice(deleteMovieIndex + 1, movieDB.movies.length);

        movieDB.movies = [...startMovieList, ...endMovieList];

        showMovieList(movieDB.movies, movieList);
    };

    function showMovieList(movies, parent) {
        parent.innerHTML = '';
        const sortedMovies = sortMovies(movies);

        sortedMovies.forEach((movie, i) => {
            parent.innerHTML += `
                <li class='promo__interactive-item'>
                    ${i + 1}. ${movie}
                    <div class="delete"></div>
                </li>`;
        });

        const deleteMovieBtns = getDeleteBtns(parent);
        deleteMovieBtns.forEach((button) => {
            button.addEventListener('click', deleteMovie);
        });
    }

    function addNewMovie(event, movies, parent) {
        event.preventDefault();

        const newMovie = addingMovieInput.value;
        const favorite = checkbox.checked;

        if (newMovie) {
            movies.push(checkMovieTitleLength(newMovie));
            showMovieList(movies, parent);

            if (favorite) {
                console.log("Добавляем любимый фильм");
            }

            event.target.reset();
        }
    }
    
    function checkMovieTitleLength(movieTitle) {
        if (movieTitle.length > 21) {
            movieTitle = `${movieTitle.substr(0, 21)}...`;
        }

        return movieTitle;
    }

    advertismentBlock.innerHTML = '';
    filmGenre.textContent = 'ДРАМА';
    poster.style.backgroundImage = "url('img/bg.jpg')";
    showMovieList(movieDB.movies, movieList);

    addingMovieForm.addEventListener('submit', (e) => addNewMovie(e, movieDB.movies, movieList));
});