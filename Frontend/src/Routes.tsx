import { Router, Switch, Route } from 'react-router-dom';

import Navbar from 'components/Navbar';
import Auth from 'pages/Auth';
import Movies from 'pages/Movies';
import MovieDetails from 'pages/MovieDetails';
import history from 'util/history';

const Routes = () => (
  <Router history={history}>
    <Navbar /> 
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Route path="/movies"exact >
        <Movies />
      </Route>
      <Route path="/movies/:movieId">
        <MovieDetails />
      </Route>
    </Switch>   
  </Router>
);

export default Routes;
