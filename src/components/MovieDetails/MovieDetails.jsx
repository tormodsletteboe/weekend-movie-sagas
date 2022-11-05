import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {useSelector} from 'react-redux'

function MovieDetails() {
    const params = useParams();
    const movie = useSelector((store)=>store.movies[params.id]);
    console.log(movie.title);

    useEffect(()=>{

    },[params.id]);

    return (
        <>
            <h1>{movie.title}</h1>
        </>
    );

}
export default MovieDetails;