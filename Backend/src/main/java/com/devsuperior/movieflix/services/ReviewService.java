package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class ReviewService {

	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	private AuthService authService;
	
	@Transactional(readOnly = true)
	public List<ReviewDTO> findByMovie(Long movieId) {
		
		try {
			Movie movie = movieRepository.getOne(movieId);			
			List<Review> reviews = reviewRepository.findByMovie(movie);			
			return reviews.stream().map(review -> new ReviewDTO(review)).collect(Collectors.toList());
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("id not found " +movieId);
		}
	}

	@Transactional
	public ReviewDTO insert(ReviewDTO dto) {
		User user = authService.authenticated();
		
		try {
			Review review = new Review();
			review.setMovie(movieRepository.getOne(dto.getMovieId()));
			review.setUser(user);
			review.setText(dto.getText());
			
			reviewRepository.save(review);
			
			return new ReviewDTO(review);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("id not found " +dto.getMovieId());
		}
	}
}
