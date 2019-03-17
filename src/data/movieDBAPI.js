const APIKEY = process.env.REACT_APP_APIKEY;
const BASE_URL = 'https://api.themoviedb.org/3/';
const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w300/'
const httpOptions = {}

class MovieDBAPI {
  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }

  getRequest(URL) {
    return fetch(URL).then(this.processResponse)
  }

  getMovie(id) {
    const URL = BASE_URL + `movie/${id}?api_key=${APIKEY}`;
    return this.getRequest(URL);
  }

  popularByYear(year) {
    const URL = BASE_URL + `discover/movie?primary_release_year=${year}&sort_by=vote_average.desc&api_key=${BASE_URL}`;
    return this.getRequest(URL);
  }

  exampleCall() {
    const URL = BASE_URL + 'movie/550?api_key=148a6f914e33e9183cd2dc9171295a05';
    fetch(URL)
      .then(this.processResponse)
      .then(console.log);
  }
}
const MDB_API = new MovieDBAPI();
export default MDB_API;