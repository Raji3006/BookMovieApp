import MovieGrid from './upcomingmovies/UpcomingMovies';
import React from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import ReleasedMovies from './releasedmovies/ReleasedMovies';
import { CardContent, Typography, Card, FormControl } from '@material-ui/core';


function Home(props) {
    return (
      <div>
        <Header {...props}/>

        <div className="upcoming-movies-heading">
            <span>Upcoming Movies</span>
        </div>
        <div className="upcoming-movies">
            <MovieGrid/>
        </div>
        <ReleasedMovies/>
        
        <div>
          <Card>
            <CardContent>
              <Typography color='theme.palette.primary.light'>FIND MOVIES BY:</Typography>
              <FormControl>
                <InputLabel placeholder="Movie Name"></InputLabel><br/>
                <InputLabel placeholder="Genres"></InputLabel>
                <InputLabel placeholder="Artists"></InputLabel>
                <InputLabel placeholder="Release Date Start"></InputLabel>
                <InputLabel placeholder="Release Date End"></InputLabel>
                <Button contained="variant" color="primary">APPLY</Button>
                
              </FormControl>
            </CardContent>
          </Card>
        </div>

      </div>
    );
  }


  export default Home;