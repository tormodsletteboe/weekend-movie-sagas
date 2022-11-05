import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'

function MovieDetails() {
    const params = useParams();

    //TODO: this needs to change, the params.id -1 could brake id records are deleted in datatable
    const movie = useSelector((store) => store.movies[params.id - 1]);
    

    useEffect(() => {

    }, [params.id]);

    return (
        <>
            <h1>{movie.title}</h1>
            <img src={movie.poster} alt={movie.title} />
            <p>{movie.description}</p>
            <Link to={'/'}>
                <button>Back to List</button>
            </Link>

        </>
    );

}
export default MovieDetails;