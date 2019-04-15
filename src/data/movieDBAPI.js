const APIKEY = process.env.REACT_APP_APIKEY;
const BASE_URL = 'https://api.themoviedb.org/3/';
const HEADER = {
  "Content-Type":"application/javascript"}
const serverURL = 'https://umcnode1.herokuapp.com/moviequery'
class MovieDBAPI {
  processResponse(response) {
    if (response.ok) {
      // console.log(response)
      return response.json();
    }
    throw response;
  }

  fetchFromServer(movie='thor'){
    console.log('fetching from server')
    let query = `?apicall=api.themoviedb.org/3/search/movie?query=${movie}`
    return fetch(serverURL+query).then(this.processResponse)
  }

  getRequest(URL) {
    return fetch(URL,HEADER).then(this.processResponse)
  }

  getMovie(id) {
    const URL = BASE_URL + `movie/${id}?api_key=${APIKEY}`;
    return this.getRequest(URL,HEADER);
  }
  getActor(id){
    const URL = BASE_URL + `person/${id}?api_key=${APIKEY}`;
    return this.getRequest(URL);
  }
  searchActor(query){
    const URL = BASE_URL + `search/person?api_key=${APIKEY}&query=${query}`
    return this.getRequest(URL)
  }

  searchMovie(query){
    const URL = BASE_URL + `search/movie?api_key=${APIKEY}&query=${query}`
    return this.getRequest(URL)
  }

  popularByYear(year) {
    const URL = BASE_URL + `discover/movie?primary_release_year=${year}&sort_by=vote_average.desc&api_key=${BASE_URL}`;
    return this.getRequest(URL);
  }

getCredits(movieID){
  const URL = BASE_URL + `movie/${movieID}/credits?api_key=${APIKEY}`
  return this.getRequest(URL)
}
exampleCall() {
  const URL = BASE_URL + `movie/550?api_key=${APIKEY}`;
  fetch(URL)
    .then(this.processResponse)
    .then(console.log);
}
}
const MDB_API = new MovieDBAPI();
export default MDB_API;