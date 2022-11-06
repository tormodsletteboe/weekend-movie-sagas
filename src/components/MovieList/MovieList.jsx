import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory,Link } from 'react-router-dom';
import './MovieList.css'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar'; //used if title of movies needs to be displayed

function MovieList() {

    //handle dispatch to store
    const dispatch = useDispatch();

    //get movies from redux store
    const movies = useSelector(store => store.movies);

    //handle browser history 
    const history = useHistory();

    //on page load
    useEffect(() => {
        //get all movies from the database
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);


//display all movie posters to the DOM
    return (
        <>
      <nav>
        <Link to='/AddMovie'>Add New Movie</Link>
      </nav>
        <Box sx={{  overflowY: 'scroll' }} className='Box'>
            {/* display images using masonry style layout */}
            <ImageList variant="masonry" cols={5} gap={20} className="movies">
                {movies.map(movie => {
                    return (
                        <ImageListItem key={movie.id}>
                            <img
                                onClick={() => { history.push(`/details/${movie.id}`) }}
                                src={movie.poster}
                                alt={movie.title}
                                loading="lazy"
                            />
                            {/* <ImageListItemBar position="below" title={movie.title} /> */}
                        </ImageListItem>
                    );
                })}
            </ImageList>
        </Box>
        </>

    );
}

export default MovieList;