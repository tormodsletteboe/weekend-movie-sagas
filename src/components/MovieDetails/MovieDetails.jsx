import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

//material ui imports
import { Card, CardMedia, CardHeader, CardContent, Typography, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

//css for this component
import './MovieDetails.css';


//displays detail view of a selected movie, title, poster image, description and any Genres, also has a back button to the movielist view "homepage"
function MovieDetails() {
    
    //get the :id from the url
    const params = useParams();

    //access web browser history
    const history = useHistory();

    //send msg to redux store
    const dispatch = useDispatch();

    //grab the movie that matches the params.id        👇 returns 1 movie that matches params.id
    const movie = useSelector((store) => store.movies.find(movie => movie.id == params.id));

    //grab the genres for this movie from the store
    const genresForSelectedMovie = useSelector((store) => store.genres_for_selected_movie);

    //gets genres for a movie with id of movie.id
    const getGenres = () => {
        dispatch({
            type: 'FETCH_GENRES_FOR_SELECTED_MOVIE',
            payload: movie.id
        })
    }

    //on page load
    useEffect(() => {
        //get this movies genres
        getGenres();
    }, [params.id]);

    //Display on the DOM
    return (
        <>
            <Card sx={{ maxWidth: 345 }} className='Card'>
                {/* Title */}
                <CardHeader
                    title={movie.title}
                    className='CardHeader'
                />
                {/* The movie poster */}
                <CardMedia
                    component='img'
                    image={movie.poster}
                    alt={movie.title}
                    sx={{ maxWidth: 186 }}
                    className='CardMedia'
                />
                {/* display the genres of this movie */}
                <Stack direction='row' spacing={2} className='Stack'>
                    {genresForSelectedMovie.map((genre) => (
                        <Chip key={genre.name} label={genre.name} variant="outlined" size="small" />
                    ))}
                </Stack>
                {/* display the description */}
                <CardContent className='CardContent'>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Description...</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2" gutterBottom>
                                {movie.description}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>


                </CardContent>
                {/* BACK TO LIST button */}
                <CardActions className='CardActions'>
                    <Button variant='contained' onClick={() => history.push('/')}>Back to List</Button>
                </CardActions>
            </Card>
        </>
    );

}
export default MovieDetails;