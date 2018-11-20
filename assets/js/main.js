const showErrorModalOnApi = () => {
    const modal = M.Modal.getInstance(document.querySelector('#error__modal'));
    const textPlace = document.querySelector('#error__modal p');

    textPlace.innerHTML = 'Something goes wrong with Api. Try later.';
    modal.open();
}

const rerender = function (data, page) {
    const main = document.querySelector('main');
    const pagination = document.querySelector('.pagination');

    main.innerHTML = '';
    pagination.innerHTML = '';

    List.Render(main, data.results);

    Pagination.Init(pagination, {
        size: data.total_pages,
        page,
        step: 1
    });
}

const handleFilm = async (event) => {
    const { id } = event.dataset;

    try {
        state.isFetching = true;
        const data = await Api.getDetails(id);

        createFilmModal(data);
    } catch (e) {
        console.log(e);
        showErrorModalOnApi();
    } finally {
        state.isFetching = false;
    }
}

const createFilmModal = (data) => {
    const modal = M.Modal.getInstance(document.querySelector('#film__modal'));
    const src = data.poster_path ?
    `${'https://image.tmdb.org/t/p/w500' + data.poster_path}` :
    'http://olivefreelibrary.org/files/2016/05/movie-film-reel.jpg';
    const title = document.querySelector('#film__modal h4');
    const img = document.querySelector('#film__modal img');
    const description = document.querySelector('#film__modal p');
    const link = document.querySelector('#film__modal a');

    title.innerHTML = data.title;
    img.src = src;
    img.alt = `Poster of ${data.title}`;
    description.innerHTML = data.overview;
    link.href = data.homepage;
    modal.open();
}

const init = () => {
    // Init datepicker
    const datepickers = document.querySelectorAll('.datepicker');
    const datepickersInstances = M.Datepicker.init(datepickers);

    // Init Modals
    const modals = document.querySelectorAll('.modal');
    const modalsInstances = M.Modal.init(modals);

    // Add Event on buttons
    const releaseNameBtn = document.querySelector('#release__name__btn');

    releaseNameBtn.addEventListener('click', async () => {
        const query = document.querySelector('#film__name').value;
        const year = new Date(document.querySelector('#film__date').value).getFullYear();
        const modal = M.Modal.getInstance(document.querySelector('#error__modal'));
        const textPlace = document.querySelector('#error__modal p');

        if (!query.trim()) {
            textPlace.innerHTML = 'Name of film cant be blanck. Please write a name of film';
            modal.open();

            return (false);
        } else if (!year) {
            textPlace.innerHTML = 'Year of film cant be blanck. Please choose year of film.';
            modal.open();

            return (false);
        }
        state.search = { query, year };
        try {
            state.isFetching = true;
            const data = await Api.searchMovies(state.search, state.page);
            rerender(data, 1);
        } catch (e) {
            showErrorModalOnApi();
        } finally {
            state.isFetching = false;
        }
    }, false);
};
