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
    yield takeEvery('FETCH_GENRES_FOR_SELECTED_MOVIE', fetchGenresForASpecificMovie)
}

// send a request to the database for all the genres of a selected movie
function* fetchGenresForASpecificMovie(action) {
    try {
        const selectedMovie_Genres = yield axios.get(`/api/movie/${action.payload}`);

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
}

//TODO: Currently not used to store the movie genres TODO: might use this in the stretch goals
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}


// Used to store the movie genres of specific movie
const genres_for_selected_movie = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES_FOR_SELECTED_MOVIE':
            return action.payload;
        default:
            return state;
    }
}
// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres_for_selected_movie,
        genres
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
