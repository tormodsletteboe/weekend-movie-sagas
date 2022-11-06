import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';


//grabs user input about a movie: TITLE, DESCRIPTION, IMAGE_URL,GENRE and stores it in a database
function AddMovieForm() {

    //local state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [genreId, setGenreId] = useState(''); //TODO: this will have to handle an array evently for the stretch goals

    //grab the genres from the store
    const genres = useSelector(store => store.genres);

    //handles messages to the redux store
    const dispatch = useDispatch();

    //on page load \
    useEffect(() => {
        // TODO: fetch all genres from the database
        dispatch({ type: 'FETCH_GENRES' });
    }, [])

    const handleGenreSelect = (evt) => {
        const genre = Number(evt.target.value);
        // const foundGenre = genres.find(genre1 => genre1.id == genre);
        // console.log('found',foundGenre);
        setGenreId(genre);
    }
    const handleSubmit = (evt) => {
        //store info in database using a dispatch
        evt.preventDefault();

        //dispatch
        

        //clear inputs
        
    }
    const handleTitleChange = (evt) => {
        setTitle(evt.target.value);
    }
    return (
        <>
            <h1>ADD MOVIE</h1>
            <form onSubmit={handleSubmit}>
                <select
                    onChange={handleGenreSelect}
                    value={genreId}
                >
                    <option value='' disabled>Select a genre</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
                <input type='text' placeholder='Movie title..' onChange={handleTitleChange} value={title} />
            </form>


        </>


    );

}
export default AddMovieForm;