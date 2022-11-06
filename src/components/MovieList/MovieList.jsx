import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import './MovieList.css'

//material ui imports
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar'; //used if title of movies needs to be displayed
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';

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



            <Box sx={{ overflowY: 'scroll' }} className='Box'>
                <Tooltip title="Add New Movie">
                <Link to='/AddMovie'>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Link>
                </Tooltip>
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