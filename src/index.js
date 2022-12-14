import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES_FOR_SELECTED_MOVIE', fetchGenresForASpecificMovie);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    yield takeEvery('CREATE_NEW_MOVIE', createNewMovie);
    yield takeEvery('DELETE_MOVIE',deleteMovie);
    yield takeEvery('FETCH_MOVIE_WITH_ID',fetchMovie_With_ID);
    yield takeEvery('UPDATE_MOVIE',updateCurrentMovie);
}

//send a put request to the database, need to update a movie
function* updateCurrentMovie(action){
    try {
        yield axios.put('/api/movie',action.payload);
        //a movie got updated the store, ie get all from database again
        yield put({
            type: 'FETCH_MOVIES'
        })
        //current movie got update on the database, need to update the store shelf
        yield put({
            type: 'FETCH_MOVIE_WITH_ID',
            payload: action.payload.id
        })
    } 
    catch{
        console.log('Error in updateCurrentMovie');
    }
}

// send a request to the database for all the genres of a selected movie
function* fetchGenresForASpecificMovie(action) {
    try {
        const selectedMovie_Genres = yield axios.get(`/api/genre/${action.payload}`);

        yield put({
            type: 'SET_GENRES_FOR_SELECTED_MOVIE',
            //                              👇 will always only have 1 item in the outer array
            payload: selectedMovie_Genres.data[0].genres
        }); //                                    👆 an array of genre objects [{id,name},{},{}]

    }
    catch {
        console.log('Error in fetchGenresForASpecificMovie');
    }
}

//get a movie with specific id
function* fetchMovie_With_ID(action){
    try {
        //       👇 will be and obj with keys id,title,poster,description
        const movie_with_id = yield axios.get(`/api/movie/${action.payload}`);
        console.log('movie with id',movie_with_id);
        yield put({
            type: 'SET_CURRENT_MOVIE',
            payload: movie_with_id.data
        });
    } 
    catch{
        console.log('Error in fetchGenresForASpecificMovie');
    }
    
    
}

// send a request to the database for all movies
function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');

        yield put({
            type: 'SET_MOVIES',
            payload: movies.data
        });

    } catch {
        console.log('Error in fetchAllMovies');
    }

}

//send a request to the database for all genres
function* fetchAllGenres() {
    try {

        const genres = yield axios.get('/api/genre');

        yield put({
            type: 'SET_GENRES',
            payload: genres.data
        });
    }
    catch
    {
        console.log('Error in fetchAllGenres')
    }

}

//send a post request to the database with a new movie to add
function* createNewMovie(action) {
    try {
        yield axios.post('/api/movie',action.payload);
        //there is a new movie update the store
        yield put({
            type: 'FETCH_MOVIES'
        });

    }
    catch {
        console.log('Error in createNewMovie');
    }
}

//delete movie from database table "movies" and from "movies_genres"
function* deleteMovie(action){
    try {
        yield axios.delete(`/api/movie/${action.payload}`);
        //a movie has been deleted, update the store
        yield put({
            type: 'FETCH_MOVIES'
        });
    } 
    catch {
        console.log('Error in deleteMovie');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
};

//TODO: Currently not used to store the movie genres TODO: might use this in the stretch goals
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
};

//shelf in store for current movie selected
const current_movie = (state={},action)=>{
    switch (action.type) {
        case 'SET_CURRENT_MOVIE':
            return action.payload;
        default:
            return state;
    }
};

// Used to store the movie genres of specific movie
const genres_for_selected_movie = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES_FOR_SELECTED_MOVIE':
            return action.payload;
        default:
            return state;
    }
};
// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres_for_selected_movie,
        genres,
        current_movie
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
