const APIKEY = process.env.REACT_APP_APIKEY;
const BASE_URL = 'https://api.themoviedb.org/3/';
const HEADER = {
  "Content-Type":"application/javascript"}
const serverURL = 'http://127.0.0.1:3001/moviequery'
class MovieDBAPI {
  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
//https://api.themoviedb.org/3/search/movie/?query=thor&
  fetchFromServer(movie){
    console.log('fetching from server')
    let query = `?apicall=https://api.themoviedb.org/3/search/movie/?query=${movie}&`
    return fetch(serverURL+query).then(this.processResponse)
  }

  getRequest(URL) {
    return fetch(URL,HEADER).then(this.processResponse)
  }

  getMovie(id) {
    const URL = BASE_URL + `movie/${id}?api_key=${APIKEY}`;
    return this.getRequest(URL,HEADER);
  }

  //searchMovie gets CORS error which is why we proxy the api-call.
  searchMovie(query){
    const URL = BASE_URL + `search/movie/?api_key=${APIKEY}&query=${query}`
    return this.getRequest(URL)
  }

  popularByYear(year) {
    const URL = BASE_URL + `discover/movie?primary_release_year=${year}&sort_by=vote_average.desc&api_key=${BASE_URL}`;
    return this.getRequest(URL);
  }

  // https://api.themoviedb.org/3/movie/api_key=148a6f914e33e9183cd2dc9171295a05&query=avatar
  // https://api.themoviedb.org/3/search/movie?api_key=148a6f914e33e9183cd2dc9171295a05&query=Thor ragnarok
  

  exampleCall() {
    const URL = BASE_URL + `movie/550?api_key=${APIKEY}`;
    fetch(URL)
      .then(this.processResponse)
      .then(console.log);
  }
}
const MDB_API = new MovieDBAPI();
export default MDB_API;