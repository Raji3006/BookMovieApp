import { GridList, Typography, GridListTile, GridListTileBar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './Details.css';
import Header from '../../common/header/Header';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import YouTube from 'react-youtube';
import { Link } from "react-router-dom";

const movieInitial = {
    genres: [],
    trailer_url: "",
    artists: [],
};

const Details = (props) => {

    //Fetch data using API
    const [movie, setMovie] = useState(movieInitial);
    const [rating, setRating] = useState(0);

    const fetchData = () => {
        return fetch("http://localhost:8085/api/v1/movies")
            .then((response) => {
                return response.json();
            })
            .then((json) => setMovie(json));
    }

    useEffect(() => {
        fetchData();
    }, [])

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    }

    const onPlayerReady = (event) => {
        event.target.pauseVideo();
    }

    let videoUrl = movie.trailer_url;
    let videoId;
    if (videoUrl) {
        videoId = videoUrl.split("v=")[1].split("&")[0];
    }

    return (
        <div className="details">
            <Header />
            <Typography className="back">
                <Link to="/"> &#60; Back to Home </Link>
            </Typography>

            <div className="parent">
                <div className="left">
                    <Typography>
                        <img
                            src={movie.poster_url}
                            alt={movie.title}
                        />
                    </Typography>
                </div>
                <div className="middle">
                    <Typography variant="heading" component="h2">
                        {movie.title}
                    </Typography>
                    <Typography className='font'>
                        Genre: {movie.genres}
                    </Typography>
                    <Typography className='font'>
                        Duration: {movie.duration}
                    </Typography>
                    <Typography className='font'>
                        Released Date: {new Date(movie.release_date).toDateString()}
                    </Typography>
                    <Typography className='font'>
                        Rating: {movie.rating}
                    </Typography><br />
                    <Typography className='font'>
                        Plot: (
                        <a href={movie.wiki_url}>Wiki Link</a>
                        ) {movie.storyline}
                    </Typography>

                    <Typography className='font'>
                        Trailer: <br />
                    </Typography>

                    <div className='trailer-box'>
                        <YouTube
                            videoId={videoId}
                            opts={opts}
                            onReady={(e) => { onPlayerReady }}
                        />
                    </div>
                </div>
                <div className="right">
                    <Typography className='font'>
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
                                    <StarBorderIcon style={{ color: ratingValue <= rating ? "yellow" : "black" }} />
                                </label>
                            );
                        })}
                    </div>

                    <div className='artists-style'>
                        <Typography className='font'>
                            Artists:

                        </Typography>
                    </div>
                    <div className='artist-grid-style'>
                        <GridList cellHeight={160} cols={2}>
                            {movie.artists != null &&
                                movie.artists.map((artist) => (
                                    <GridListTile className="gridTile" key={artist.id}>
                                        <img
                                            src={artist.profile_url}
                                            alt={artist.first_name + " " + artist.last_name}
                                        />
                                        <GridListTileBar title={artist.first_name + " " + artist.last_name} />
                                    </GridListTile>
                                ))}
                        </GridList>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;