import React, { useState, useEffect } from "react";
import { GridList, GridListTile, GridListTileBar,ImageList,ImageListItemBar,ImageListItem } from "@material-ui/core";


function MovieGrid() {
  const [movies, setMovies] = useState([]);

  const fetchData = () => {
    return fetch("http://localhost:8085/api/v1/movies")
        .then((response) => {
            return response.json();
        })
        .then((json) => setMovies(json));
}
console.log("movies:",movies)

useEffect(() => {
    fetchData();
},[])

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", overflow: "hidden", backgroundColor: "#e0e0e0" }}>
      <ImageList rowHeight={250} cols={6}>
        {Array.isArray(movies) && movies.map((movie) => (
          <ImageListItem key={movie.id}>
            <img src={movie.poster_url} alt={movie.title} />
            <ImageListItemBar title={movie.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default MovieGrid;