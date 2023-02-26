import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import UpcomingMovies from './upcomingmovies/UpcomingMovies';
import { ImageList, ImageListItem, ImageListItemBar } from "@material-ui/core";
import {
  CardContent, Typography, Card, FormControl, withStyles, Input, Select, TextField,
  InputLabel, Button, MenuItem, Checkbox, ListItemText
} from '@material-ui/core';


const styles = (theme) => ({
  root: {
    
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  upcomingMoviesHeading: {
    textAlign: "center",
    background: "#ff9999",
    padding: "8px",
    fontSize: "1rem",
  },
  gridListUpcomingMovies: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    width: "100%",
  },
  gridListMain: {
    transform: "translateZ(0)",
    cursor: "pointer",
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240,
    maxWidth: 240,
  },
  title: {
    color: theme.palette.primary.light,
  },
  pointer: {
    cursor: "pointer",
    margin: "15px",
  },
});

const handleMovieClick = (movieId) => {
  window.location.href = `/movie/${movieId}`;
};

function Home(props) {

  const { baseUrl, classes } = props;
  const [movieName, setMovieName] = useState("");
  const [releaseDateStart, setReleaseDateStart] = useState("");
  const [releaseDateEnd, setReleaseDateEnd] = useState("");
  const [genres, setGenres] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [artists, setArtists] = useState([]);
  const [artistsList, setArtistsList] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);


  /* Make API Call to Fetch the data */
  useEffect(() => {
    const setData = async () => {

      /* API Call */
      const getGenres = fetch(`${baseUrl}genres`);
      const releasedMoviesRequest = fetch(`${baseUrl}movies?status=RELEASED`);

      /* Using Promise fetch data into setGenres */
      const [setGenresresult,] = await Promise.all([
        getGenres,
      ]);
      /* Check whether API call was successfull and we received status as 200 */
      if (setGenresresult.status === 200) {
        const genres = await setGenresresult.json();
        setGenresList(genres.genres);
      }

      const getArtists = fetch(`${baseUrl}artists`);

      const [setArtists,releasedMoviesResponse] = await Promise.all([
        getArtists,releasedMoviesRequest
      ]);

      if (setArtists.status === 200) {
        const artists = await setArtists.json();
        setArtistsList(artists.artists);
      }

      if (releasedMoviesResponse.status === 200) {
        const releasedMovies = await releasedMoviesResponse.json();
        setReleasedMovies(releasedMovies.movies);
      }
    };
    setData();
  }, []);


  const changeMovieHandler = (event) => {
    setMovieName(event.target.value);
  }

  const selectGenresHandler = (event) => {
    if(event && event.target && event.target.value)
    setGenres(event.target.value);
  }

  const selectArtistsHandler = (event) => {
    if(event && event.target && event.target.value)
    setArtists(event.target.value);
  }

  const releaseDateStartHandler = (event) => {
    setReleaseDateStart(event.target.value);
  }

  const releaseDateEndHandler = (event) => {
    setReleaseDateEnd(event.target.value);
  }

  const filterApplyHandler = async () => {
    let queryString = "?status=RELEASED";
    if (movieName !== "") {
      queryString += "&title=" + movieName;
    }
    if (genres.length > 0) {
      queryString += "&genres=" + genres.toString();
    }
    if (artists.length > 0) {
      queryString += "&artists=" + artists.toString();
    }
    if (releaseDateStart !== "") {
      queryString += "&start_date=" + releaseDateStart;
    }
    if (releaseDateEnd !== "") {
      queryString += "&end_date=" + releaseDateEnd;
    }

    const response = await fetch(`${baseUrl}movies${encodeURI(queryString)}`);

    const data = await response.json();
    if (response.status === 200) {
      setReleasedMovies(data.movies);
    }
  };

  return (
    <div>
      <Header {...props} />

      <div className="upcoming-movies-heading">
        <span>Upcoming Movies</span>
      </div>
      <div className="upcoming-movies">
        <UpcomingMovies />
      </div>

      <div className="flex-container">
        <div className="left" style={{width:"76%"}}>
          <ImageList rowHeight={350} cols={4} className={classes.gridListMain}>
          {releasedMovies.map((movie) => (
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
                  subtitle={`Released: ${new Date(
                    movie.release_date
                  ).toDateString()}`}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
        
        <div className="right" style={{width:"24%", height:"400px"}}>
          <Card className="card">
            <CardContent style={{padding:"0px"}}>
              <FormControl className={classes.formControl}>
                <Typography className={classes.title} style={{textAlign:"left"}}>FIND MOVIES BY:</Typography>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                <Input id="movieName" onChange={changeMovieHandler} />
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="genres">Genres</InputLabel>
                <Select multiple
                  input={<Input id="genres" />}
                  renderValue={(selected) => selected.join(",")}
                  value={genres?genres:[]}
                  onClick={selectGenresHandler} onBlur={selectGenresHandler}
                >
                  {genresList.map((genre) => (
                    <MenuItem key={genre.id} value={genre.genre}>
                      <Checkbox checked={genres && genres.indexOf(genre.genre) > -1} />
                      <ListItemText primary={genre.genre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="artists">Artists</InputLabel>
                <Select multiple
                  input={<Input id="artists" />}
                  renderValue={(selected) => selected.join(",")}
                  value={artists?artists:[]}
                  onClick={selectArtistsHandler} onBlur = {selectArtistsHandler}
                >
                  {artistsList.map((artist) => (
                    <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                      <Checkbox checked={artists && artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                      <ListItemText primary={artist.first_name + " " + artist.last_name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  id="releaseDateStart"
                  label="Release Date Start"
                  type="date"
                  defaultValue=""
                  InputLabelProps={{ shrink: true }}
                  onChange={releaseDateStartHandler}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  id="releaseDateEnd"
                  label="Release Date End"
                  type="date"
                  defaultValue=""
                  InputLabelProps={{ shrink: true }}
                  onChange={releaseDateEndHandler}
                />
              </FormControl>
              <br />
              <br />
              <FormControl className={classes.formControl}>
                <Button  onClick={filterApplyHandler} variant="contained" color="primary">APPLY</Button>
              </FormControl>

            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}

export default withStyles(styles)(Home);