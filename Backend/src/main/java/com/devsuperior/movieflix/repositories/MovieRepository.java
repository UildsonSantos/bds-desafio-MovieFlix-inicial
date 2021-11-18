package com.devsuperior.movieflix.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.movieflix.entities.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

	@Query("SELECT obj FROM Movie obj INNER JOIN obj.genre cats WHERE  "
	        + "(cats.id = :genreId OR :genreId = 0)"
	        + "ORDER BY obj.title")
	Page<Movie> find( Long genreId, Pageable pageable);	
}
