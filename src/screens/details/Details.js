import { GridList, Typography, GridListTile, GridListTileBar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './Details.css';
import Header from '../../common/header/Header';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import YouTube from 'react-youtube';

const Details = () => {

    const backToHome = "< Back to Home";
    
    //Fetch data using API
    const [movie, setMovie] = useState({});
    const [rating, setRating] = useState(0);
    const [player, setPlayer] = useState(null);

    const fetchData = () => {
        return fetch("http://localhost:8085/api/v1/movies")
            .then((response) => {
                return response.json();
            })
            .then((json) => setMovie(json));
    }
    
    useEffect(() => {
         fetchData();
    },[])

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1,
        },
      }

      const onPlayerReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }

    return(
        <div className="details">
            <Header /> 
            <Typography>
                {/* <Link to={"/home/"} > */}
                {backToHome}
                {/* </Link>  */}                
            </Typography>
            
            <div className="parent">
                <div className="left">                  
                    <Typography>
                        <img 
                        src= { movie && movie.movies && movie.movies[0].poster_url } 
                        alt= { movie && movie.movies && movie.movies[0].title }
                        style={{ width: 200, height: 250, marginLeft: 0, marginTop: 16, marginRight: 16, marginBottom: 16}} 
                        />
                    </Typography>
                </div>
                <div className="middle">
                    <Typography variant="heading" component="h2">
                    { movie && movie.movies && movie.movies[0].title }
                    </Typography>
                    <Typography style={{ fontWeight: 'bold'}}>
                        Genre: { movie && movie.movies && movie.movies[0].genres}
                    </Typography>
                    <Typography style={{ fontWeight: 'bold'}}>
                        Duration: { movie && movie.movies && movie.movies[0].duration }
                    </Typography>
                    <Typography style={{ fontWeight: 'bold'}}>
                        Released Date: { movie && movie.movies && movie.movies[0].release_date }
                    </Typography>
                    <Typography style={{ fontWeight: 'bold'}}>
                        Rating: { movie && movie.movies && movie.movies[0].rating }
                    </Typography><br/>
                    <Typography style={{ fontWeight: 'bold'}}>
                        Plot: ( 
                        <a href={movie && movie.movies && movie.movies[0].wiki_url}>Wiki Link</a>
                        ) { movie && movie.movies && movie.movies[0].storyline }
                    </Typography>
                    <div className='trailer-box' style={{ marginTop: '16px' }}>
                    <Typography style={{ fontWeight: 'bold'}}>
                        Trailer:
                    </Typography>
                     
                    <div className='trailer-box'>
                        <YouTube 
                            src= {movie && movie.movies && movie.movies[0].trailer_url}
                            opts={opts} 
                            onReady={(e) => { onPlayerReady }}
                        />
                    </div>
                    </div>
                </div>
                <div className="right">
                    <Typography style={{ fontWeight: 'bold' }}>
                        Rate this movie:
                    </Typography> 
                    <div >
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return (
                            <label>
                                <input 
                                    type="radio" 
                                    name="rating" 
                                    value={ratingValue} 
                                    onClick={() => setRating(ratingValue)}
                                    />
                                <StarBorderIcon className="star" style={{color: ratingValue <= rating ? "yellow" : "black"}}/>
                            </label>
                            );
                        })}
                    </div>
                    <div className='artists-style'>
                        <Typography style={{ fontWeight: 'bold'}}>
                            Artists:
                        </Typography>

                    </div>
                    
                </div>
                
            </div>
        </div>
    )
    }

export default Details;