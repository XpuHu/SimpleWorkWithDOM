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
        ]
    };

    const advertismentBlock = document.querySelector('.promo__adv'),
        poster = document.querySelector('.promo__bg'),
        filmGenre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addingMovieForm = document.querySelector('.add'),
        checkbox = addingMovieForm.querySelector('input[type="checkbox"]'),
        addingMovieInput = addingMovieForm.querySelector('.adding__input');

    // let deleteMovieBtns = movieList.querySelectorAll('.delete');

    advertismentBlock.innerHTML = '';
    filmGenre.textContent = 'ДРАМА';
    poster.style.backgroundImage = "url('img/bg.jpg')";
    setMovieList();

    addingMovieForm.addEventListener('submit', addNewMovie);

    function addNewMovie(event) {
        event.preventDefault();

        const newMovie = addingMovieInput.value;
        const favorite = checkbox.checked;

        if (newMovie.length > 0) {
            movieDB.movies.push(checkMovieTitleLength(newMovie));
            setMovieList(movieDB.movies);

            if (favorite === true) {
                console.log("Добавляем любимый фильм");
                checkbox.checked = false;
            }

            addingMovieInput.value = '';
        }
    }

    function deleteMovie() {
        const deleteMovieItem = this.parentElement.textContent.trim().slice(3);

        const deleteMovieIndex = movieDB.movies.indexOf(deleteMovieItem);

        const startMovieList = movieDB.movies.slice(0, deleteMovieIndex);
        const endMovieList = movieDB.movies.slice(deleteMovieIndex + 1, movieDB.movies.length);

        movieDB.movies = [...startMovieList, ...endMovieList];

        setMovieList(movieDB.movies);
    }


    function setMovieList() {
        movieList.innerHTML = '';
        const sortedMovies = movieDB.movies.map((movie) => {
            return movie.toUpperCase();
        }).sort();

        sortedMovies.forEach((movie, i) => {
            movieList.innerHTML += `
                <li class='promo__interactive-item'>
                    ${i + 1}. ${movie}
                    <div class="delete"></div>
                </li>`;
        });

        const deleteMovieBtns = movieList.querySelectorAll('.delete');
        deleteMovieBtns.forEach((button) => {
            button.addEventListener('click', deleteMovie);
        });

        movieDB.movies = sortedMovies;
    }

    function checkMovieTitleLength(movieTitle) {
        if (movieTitle.length > 21) {
            movieTitle = movieTitle.substr(0, 21) + '...';
        }

        return movieTitle;
    }
});