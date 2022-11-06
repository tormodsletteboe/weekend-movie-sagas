import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);



    return (
        <Box sx={{  overflowY: 'scroll' }} className='Box'>
            <ImageList variant="masonry" cols={5} gap={20} className="movies">
                {movies.map(movie => {
                    return (
                        <ImageListItem key={movie.id}>
                            <img
                                onClick={() => { history.push(`/${movie.id}`) }}
                                src={movie.poster}
                                alt={movie.title}
                                loading="lazy"
                            />
                            {/* <ImageListItemBar position="below" title={'.........'} /> */}
                        </ImageListItem>
                    );
                })}
            </ImageList>
        </Box>

    );
}

export default MovieList;