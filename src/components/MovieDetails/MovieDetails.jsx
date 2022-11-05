import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

//displays detail view of a selected movie, title, poster image, description and any Genres, also has a back button to the movielist view "homepage"
function MovieDetails() {
    //get the :id from the url
    const params = useParams();

    //send msg to redux store
    const dispatch = useDispatch();

    //grab the movie that matches the params.id        👇 returns 1 movie that matches params.id
    const movie = useSelector((store) => store.movies.find(movie => movie.id == params.id));

    const genresForSelectedMovie = useSelector((store)=>store.genres_for_selected_movie);
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
            <h1>{movie.title}</h1>
            <img src={movie.poster} alt={movie.title} />
            {genresForSelectedMovie.map((genre)=>(
                <p key={genre.name}>{genre.name}</p>
            ))}
            <p>{movie.description}</p>
            <Link to={'/'}>
                <button>Back to List</button>
            </Link>

        </>
    );

}
export default MovieDetails;