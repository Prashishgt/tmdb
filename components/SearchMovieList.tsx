import React from "react";

interface Movie {
  id: number;
  title: string;
}

interface MovieListProps {
  movies: Movie[];
}

const SearchMovieList: React.FC<MovieListProps> = ({ movies }) => {
  if (movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
};

export default SearchMovieList;
