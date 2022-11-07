import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { useHistory, Link,useParams } from 'react-router-dom';


//material ui imports
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




function EditMovieDetails(){
     //local state
     const [title, setTitle] = useState('');
     const [description, setDescription] = useState('');
     const [imageURL, setImageURL] = useState('');
    //  const [genreId, setGenreId] = useState(''); //TODO: this will have to handle an array evently for the stretch goals
  
     //grab the genres from the store
    //  const genres = useSelector(store => store.genres);
     const movie = useSelector(store => store.current_movie);
    //  const genreForMovie = useSelector(store => store.genres_for_selected_movie)
 
     //handles messages to the redux store
     const dispatch = useDispatch();
 
     //handles browser history
     const history = useHistory();

     //get the params id
     const params = useParams();
 
     //on page load \
     useEffect(() => {
         
         dispatch({
            type: 'FETCH_MOVIE_WITH_ID',
            payload: params.id
        });
        // TODO: fetch all genres from the database
        //  dispatch({ 
        //     type: 'FETCH_GENRES'
        // });

        if(movie!=undefined){
            // dispatch({
            //     type: 'FETCH_GENRES_FOR_SELECTED_MOVIE',
            //     payload: movie.id
            // })
            setTitle(movie.title);
            setDescription(movie.description);
            setImageURL(movie.poster);

        }


     }, [params.id])
 
    //  const handleGenreSelect = (evt) => {
    //      const genre = Number(evt.target.value);
    //      // const foundGenre = genres.find(genre1 => genre1.id == genre);
    //      // console.log('found',foundGenre);
    //      setGenreId(genre);
    //  }
     const handleSubmit = (evt) => {
         //store info in database using a dispatch
         evt.preventDefault();
 
         //create movie object to post
         const editMovie = {
             title,
             description,
             poster: imageURL,
             id: movie.id
            //  genre_id: genreId
         };
 
         // dispatch 
         dispatch({
             type: 'UPDATE_MOVIE',
             payload: editMovie
         })
 
 
         //clear inputs
         setTitle('');
         setDescription('');
         setImageURL('');
        //  setGenreId('');
 
         //go to home page
         history.push(`/details/${params.id}`);
 
     }
     //handle button cancel click
     const handleCancel = () => {
         //go to home page
         history.push(`/details/${params.id}`);
     }

     return (
         <>
             <CssBaseline />
             <Container maxWidth="sm">
                 <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} >
                     
                     <Typography variant='h3'>EDIT MOVIE</Typography>
                     <form onSubmit={handleSubmit} className='AddMovieForm' >
 
                         <TextField required label="Title" variant="standard" onChange={(evt) => setTitle(evt.target.value)} value={title} />
                         <TextField
                             sx={{ paddingBottom: 2 }} 
                             required label="Image Url" 
                             variant="standard" 
                             onChange={(evt) => setImageURL(evt.target.value)} 
                             value={imageURL} />
 
 
                         {/* <FormControl sx={{ m: 1, minWidth: 220 }}>
                             <InputLabel id="lable">Select genre</InputLabel>
                             <Select
                                 onChange={handleGenreSelect}
                                 value={genreId}
                                 label="Select genre"
                                 labelId="lable"
                                 required
                               
                             >
 
                                 {genres.map((genre) => (
                                     <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                                 ))}
                             </Select>
                         </FormControl> */}
                         <FormControl fullWidth sx={{ paddingLeft: 2 }}>
                             <TextField
                                 required
                                 sx={{ paddingLeft: 2 }}
                                 fullWidth
                                 multiline
                                 rows={4}
                                 variant="standard"
                                 label='Description'
                                 onChange={(evt) => setDescription(evt.target.value)}
                                 value={description}
                             />
                         </FormControl>
                         <Button type='submit'>Save</Button>
                         <Button type='button' onClick={handleCancel}>Cancel</Button>
                     </form>
                 </Box>
             </Container>
 
 
 
 
 
 
         </>
 
 
     );

}
export default EditMovieDetails;