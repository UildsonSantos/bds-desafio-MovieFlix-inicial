import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { getTokenData, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';
import history from 'util/history';
import { AuthContext } from 'AuthContext';

import './styles.css';

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar bg-primary main-nav">
      {authContextData.authenticated ? (
        <Link to="/movies" className="nav-logo-text">
          <h4>MovieFlix</h4>
        </Link>
      ) : (
        <h4>MovieFlix</h4>
      )}

      {authContextData.authenticated && (
        <div className="nav-login-logout">
          <Link to="/" onClick={handleLogoutClick}>
            SAIR
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
