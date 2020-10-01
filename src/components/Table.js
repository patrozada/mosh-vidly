import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';

class Table extends Component {
  state = {
    movies: getMovies().flat()
  };
  render() {
    console.log(this.state.movies)
    return <table className="table">
      <thead>
        <tr>
          <th> and I'm a column</th>
          <th> and I'm a column</th>
          <th> and I'm a column</th>
          <th> and I'm a column</th>
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
            <td> <button className="btn btn-danger btn-sm"> Delete </button> </td>
          </tr>
        )}
      </tbody>
      
    </table>

  }
}

export default Table;