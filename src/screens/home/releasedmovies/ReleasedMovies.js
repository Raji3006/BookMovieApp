import React, { useState, useEffect } from "react";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import "./releasedMovies.css";

function ReleasedMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("api/v1/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.log(error));
  }, []);

  const handleMovieClick = (movieId) => {
    window.location.href = `/movie/${movieId}`;
  };

  return (
    <div className="root">
      <GridList cellHeight={350} cols={4} className="gridList">
        {Array.isArray(movies) && movies.map((movie) => (
          <GridListTile
            key={movie.id}
            className="pointer"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img src={movie.poster_url} alt={movie.title} />
            <GridListTileBar
              title={movie.title}
              subtitle={`Released: ${movie.release_date}`}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default ReleasedMovies;