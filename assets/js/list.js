const List = {
    Item: function (film) {
        const src = film.poster_path ?
        `${'https://image.tmdb.org/t/p/w500' + film.poster_path}` :
        'http://olivefreelibrary.org/files/2016/05/movie-film-reel.jpg';

        return (`
            <div class = "card film-item" data-id = "${film.id}" onclick="handleFilm(this)">
                <div class = "card-image">
                    <img src = "${src}" alt = "Poster of ${film.title}">
                </div>
            </div>
        `);
    },
    Render: function (e, data) {
        const Films = data.map(value => List.Item(value));
        const html = `
            <div class = "films-list">
                ${ Films.join('') }
            </div>
        `;

        e.innerHTML = html;
    }
}
