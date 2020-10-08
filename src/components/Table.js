import React, { Component } from 'react';
import Like from './common/Like';
import {getMovies} from '../services/fakeMovieService';

class Table extends Component {
  state = {
    movies: getMovies()
  };
handleLike = (movie) => {
  const movies = [... this.state.movies];
  const index = movies.indexOf(movie);
  movies[index] = {...movies[index]};
  movies[index].liked = !movies[index].liked;
  this.setState({movies});
}
handleDelete = (movie) => {
  const movies = this.state.movies.filter(m => m._id !== movie._id);
  this.setState({movies});
}

  render() {
    const {length: count} = this.state.movies
    if (count === 0) {return<p>There are no movies to show</p>}
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
            { this.state.movies.map(movie => 
              <tr key={movie._id}>
                <td> {movie.title} </td>
                <td> {movie.genre.name}</td>
                <td> {movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)}/></td>
                <td> <button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm"> Delete </button> </td>
              </tr>
            )}
          </tbody>
          
        </table>
      </>
    )
  }
}

export default Table;