import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { useHistory,Link } from 'react-router-dom';
import './AddMovieForm.css'

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

    //handles browser history
    const history = useHistory();

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

        //create movie object to post
        const newMovie = {
            title,
            description,
            poster: imageURL,
            genre_id: genreId
        };

        // dispatch 
        dispatch({
            type: 'CREATE_NEW_MOVIE',
            payload: newMovie
        })


        //clear inputs
        setTitle('');
        setDescription('');
        setImageURL('');
        setGenreId('');

        //go to home page
        history.push('/');

    }
    //handle button cancel click
    const handleCancel = () => {
        //go to home page
        history.push('/');
    }
    return (
        <>
        <nav>
            <Link to='/'>HOME</Link>
        </nav>
            <h1>ADD MOVIE</h1>
            <form onSubmit={handleSubmit} className='AddMovieForm'>

                <input type='text' placeholder='title..' onChange={(evt) => setTitle(evt.target.value)} value={title} />
                <textarea type='text' placeholder='description..' onChange={(evt) => setDescription(evt.target.value)} value={description} />
                <input type='text' placeholder='image url..' onChange={(evt) => setImageURL(evt.target.value)} value={imageURL} />
                <select
                    onChange={handleGenreSelect}
                    value={genreId}
                >
                    <option value='' disabled>Select a genre</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
                <button type='submit'>Save</button>
                <button type='button' onClick={handleCancel}>Cancel</button>
            </form>


        </>


    );

}
export default AddMovieForm;