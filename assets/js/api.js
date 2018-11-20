const config = {
    key: '5874acfd11651a28c55771624f7021f4',
    language: 'en-US',
    URL: 'https://api.themoviedb.org/3/'
}

const Api = {
    searchMovies: async function (query, page) {
        let search = '';

        for (let key in query) {
            if (query[key]) {
                search += `&${key}=${query[key]}`;
            }
        }
        search += `&page=${page}`;

        const response = await fetch(`${config.URL}search/movie?api_key=${config.key}&language=${config.language}${search}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        });

        const data = await response.json();

        if (response.status !== 200) {
            throw new Error('Error with discoverMovie Api');
        }

        return (data);
    },
    getDetails: async function (id) {
        const response = await fetch(`${config.URL}movie/${id}?api_key=${config.key}&language=${config.language}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        });

        const data = await response.json();

        if (response.status !== 200) {
            throw new Error('Error with discoverMovie Api');
        }

        return (data);
    }
};
