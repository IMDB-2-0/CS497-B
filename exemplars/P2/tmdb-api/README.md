## TMDB API

To pull up our movies, we utilize the TMDB api to grab metadata and information on movies and tv shows.

[**TMDB**](https://www.themoviedb.org/?language=en-US) is a database storing information on movies and tv shows.

## Setup
1. Create a new website on their website
2. Access your API settings with this link: https://www.themoviedb.org/settings/api
3. Copy your API key (v3 auth)
4. Assuming you've created a react app, create a .env file in your react app.
5. Add your api keys: (make sure to have REACT_APP in the header)
```
REACT_APP_TMDB_API_KEY=<your api key>
REACT_APP_TMDB_URL=https://api.themoviedb.org/3
REACT_APP_TMDB_IMG_URL=https://image.tmdb.org/t/p
```
6. Create a new file in your react app in the src folder as `constants/config.js`
7. Add your constants: 
```
export const TMDB_URL = process.env.REACT_APP_TMDB_URL;
export const TMDB_IMG_URL = process.env.REACT_APP_TMDB_IMG_URL;
export const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY; 
```
8. Utilize it where it's needed. Here's an example of utilizing the TMDB API in our react app to grab popular movies:
```
import { TMDB_URL, TMDB_API_KEY } from "../../constants/config";

export const fetchPopularMovies = page => dispatch => {
    return axios
        .get(`${TMDB_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`)
        .then(response =>
        dispatch({
            type: FETCH_POPULAR_MOVIES,
            payload: response.data
        })
        ).catch(err => console.log(err));
}
```