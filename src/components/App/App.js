import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovieForm from '../AddMovieForm/AddMovieForm';

//not sure if fontsource import goes here or somewhere else, work with material ui
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  return (
    <div className="App">


      <Router>
        
        {/* home page */}
        <Route path="/" exact>
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path="/details/:id" exact>
          <MovieDetails />
        </Route>

        {/* Add Movie page */}
        <Route path="/AddMovie" exact>
          <AddMovieForm />
        </Route>

      </Router>
    </div>
  );
}


export default App;
