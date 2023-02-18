import MovieGrid from './upcomingmovies/UpcomingMovies';
import React from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import ReleasedMovies from './releasedmovies/ReleasedMovies';


function Home() {
    return (
      <div>
        <Header />

        <div className="upcoming-movies-heading">
            <span>Upcoming Movies</span>
        </div>
        <div className="upcoming-movies">
            <MovieGrid/>
        </div>
        <ReleasedMovies/>
        
      </div>
    );
  }


  export default Home;