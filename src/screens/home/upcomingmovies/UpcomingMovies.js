import React, { useState, useEffect } from "react";
import { ImageList,ImageListItemBar,ImageListItem } from "@material-ui/core";


function UpcomingMovies() {
  const [movies, setMovies] = useState([]);

  const fetchData = () => {
    return fetch("http://localhost:8085/api/v1/movies?page=1&limit=10&status=published")
        .then((response) => {
            return response.json();
        })
        .then((json) => setMovies(json.movies));
}
useEffect(() => {
    fetchData();
},[])

  return (
    <div style={{ display: "flex",justifyContent: "center", overflowX: "auto", overflowY:"hidden"}}>
      <ImageList rowHeight={250} cols={6} style={{ width: "100%", margin: 0, padding: 0, flexWrap: "nowrap" }}>
        {Array.isArray(movies) && movies.map((movie) => (
          <ImageListItem key={movie.id}>
              {movie.poster_url ? (
              <img src={movie.poster_url} alt={movie.title} />
            ) : (
              <img src="https://via.placeholder.com/150x225?text=No+Poster" alt={movie.title} />
            )}

            <ImageListItemBar title={movie.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default UpcomingMovies;