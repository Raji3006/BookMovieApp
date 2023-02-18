import React, { useState, useEffect } from "react";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    width: "75%",
  },
  gridList: {
    width: "100%",
    height: 350,
  },
  pointer: {
    cursor: "pointer",
  },
}));

function ReleasedMovies() {
  const [movies, setMovies] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:8085/api/movies/released")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.log(error));
  }, []);

  const handleMovieClick = (movieId) => {
    window.location.href = `/movie/${movieId}`;
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={350} cols={4} className={classes.gridList}>
        {movies.map((movie) => (
          <GridListTile
            key={movie.id}
            className={classes.pointer}
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