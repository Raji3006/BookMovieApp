import React, { useState, useEffect } from "react";
import { ImageList, ImageListItem, ImageListItemBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    overflow: "hidden",
    width: "76vw", 
    margin: "16px",
  },
  gridList: {
    width: "100%",
    height: 350,
    margin:"16px",
  },
  pointer: {
    cursor: "pointer",
  },
}));

function ReleasedMovies() {

  const classes = useStyles();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8085/api/v1/movies?page=1&limit=10&status=released")
      .then((response) => response.json())
      .then((data) => setMovies(data.movies))
      .catch((error) => console.log(error));
  }, []);

  console.log("movies:", movies);

  const handleMovieClick = (movieId) => {
    window.location.href = `/movie/${movieId}`;
  };

  return (
    <div className={classes.root}>
      <ImageList rowHeight={350} cols={4} className={classes.gridList}>
        {movies.map((movie) => (
          <ImageListItem
            key={movie.id}
            className={classes.pointer}
            onClick={() => handleMovieClick(movie.id)}
          >
            {movie.poster_url ? (
              <img src={movie.poster_url} alt={movie.title} />
            ) : (
              <img
                src="https://via.placeholder.com/150x225?text=No+Poster"
                alt={movie.title}
              />
            )}
            <ImageListItemBar
              title={movie.title}
              subtitle={`Released: ${new Date(movie.release_date).toDateString()}`}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default ReleasedMovies;
