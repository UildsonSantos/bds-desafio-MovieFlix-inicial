import { Route, Switch } from 'react-router-dom';

import { ReactComponent as MainImage } from 'assets/images/main-image.svg';

import './styles.css';
import Login from './Login';

const Auth = () => {
  return (
    <div className="admin-container">
      <div className="admin-banner-container">
        <h1>Avalie Filmes</h1>
        <p>Diga o que você achou do seu filme favorito</p>
        <MainImage />
      </div>
      <div className="admin-form-container">
        <Switch>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Auth;
