import { useParams, Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import { Card,CardMedia,CardHeader,CardContent,Typography } from '@mui/material';



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

    const genresForSelectedMovie = useSelector((store) => store.genres_for_selected_movie);
    const getGenres = () => {
        dispatch({
            type: 'FETCH_GENRES_FOR_SELECTED_MOVIE',
            payload: movie.id
        })
    }

    //on page load
    useEffect(() => {
        getGenres();
        console.log()
    }, [params.id]);

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title={movie.title}
                />
                <CardMedia
                    component='img'
                    image={movie.poster}
                    alt={movie.title}
                />
                {genresForSelectedMovie.map((genre) => (
                    <Typography key={genre.name}>{genre.name}</Typography>
                ))}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    {movie.description}
                    </Typography>
                </CardContent>
                
               

            </Card>

            <Button variant='contained' onClick={() => history.push('/')}>Back to List</Button>


        </>
    );

}
export default MovieDetails;