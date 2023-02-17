import React, { useState, useEffect } from "react";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";

function MovieGrid() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      "here we have to use api"
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", overflow: "hidden", backgroundColor: "#e0e0e0" }}>
      <GridList cellHeight={250} cols={6}>
        {movies.map((movie) => (
          <GridListTile key={movie.id}>
            <img src={movie.poster_url} alt={movie.title} />
            <GridListTileBar title={movie.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default MovieGrid;