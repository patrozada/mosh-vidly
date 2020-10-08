import React, { Component } from 'react';
import Like from './common/Like';
import {getMovies} from '../services/fakeMovieService';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';

class Table extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
  };
handleLike = (movie) => {
  const movies = [...this.state.movies];
  const index = movies.indexOf(movie);
  movies[index] = {...movies[index]};
  movies[index].liked = !movies[index].liked;
  this.setState({movies});
}
handleDelete = (movie) => {
  const movies = this.state.movies.filter(m => m._id !== movie._id);
  this.setState({movies});
}
handlePageChange = (page) => {
  this.setState({currentPage: page})
}
  render() {
    const {length: count} = this.state.movies;
    const { currentPage, pageSize, movies: allMovies } = this.state;
    if (count === 0) {return<p>There are no movies to show</p>}
    const movies = paginate(allMovies, currentPage, pageSize)
    return (
      <>
        <p>There are {count} movies displayed</p>
        <table className="table">
          <thead>
            <tr>
              <th> Title</th>
              <th> Genre</th>
              <th> Stock</th>
              <th> Rate</th>
              <th>Like</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { movies.map(movie => 
              <tr key={movie._id}>
                <td> {movie.title} </td>
                <td> {movie.genre.name}</td>
                <td> {movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><Like 
                  liked={movie.liked} 
                  onClick={() => this.handleLike(movie)}
                  /></td>
                <td> <button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm"> Delete </button> </td>
              </tr>
            )}
          </tbody>
          <Pagination 
            itemsCount={count} 
            onPageChange={this.handlePageChange} 
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </table>
      </>
    )
  }
}

export default Table;