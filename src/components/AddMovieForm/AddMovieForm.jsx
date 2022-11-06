import { useSelector,useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';


//grabs user input about a movie: TITLE, DESCRIPTION, IMAGE_URL,GENRE and stores it in a database
function AddMovieForm() {
   
    //local state
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [imageURL,setImageURL] = useState('');
    const [genreId,setGenreId] = useState(''); //TODO: this will have to handle an array evently for the stretch goals

    //grab the genres from the store
    const genres = useSelector(store => store.genres);

    //handles messages to the redux store
    const dispatch = useDispatch();

    //on page load \
    useEffect(() => {
        // TODO: fetch all genres from the database
        dispatch({type: 'FETCH_GENRES' });
    }, [])

    return (
        <h1>ADD MOVIE</h1>
    );

}
export default AddMovieForm;