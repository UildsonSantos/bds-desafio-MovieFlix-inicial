import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import { isAuthenticated } from 'util/auth';
import history from 'util/history';

import './styles.css';

const Movies = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/movies',
      withCredentials: true,
    };

    setIsLoading(true);
    isAuthenticated()
      ? requestBackend(params)
          .then((response) => {
            setPage(response.data);
          })
          .finally(() => {
            setIsLoading(false);
          })
      : history.push('/');
  }, []);

  return (
    <div className="movie-container">
      <h1>Tela listagem de filmes</h1>

      {isLoading ? (
        <h1>Carregando...</h1>
      ) : (
        page?.content.map((movie) => (
          <div className="col-sm-6 col-lg-4 col-xl-3" key={movie.id}>
            <Link to={`/movies/${movie.id}`}>Acessar /movies/{movie.id}</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Movies;
