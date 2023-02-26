import React, { useState, useEffect } from 'react';
import './Details.css';
import Header from '../../common/header/Header';
import { GridList, Typography, GridListTile, GridListTileBar } from '@material-ui/core';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import YouTube from 'react-youtube';
import { Link } from "react-router-dom";

const movieInitial = {
    genres: [],
    trailer_url: "",
    artists: [],
};

const opts = {
    height: '300',
    width: '750',
    playerVars: {
        autoplay: 1,
    },
};

const Details = (props) => {

    //Fetch data using API
    const [movie, setMovie] = useState(movieInitial);
    const [rating, setRating] = useState(0);

    const onPlayerReady = (event) => {
        event.target.pauseVideo();
    }

    const fetchData = () => {
        return fetch(`${props.baseUrl}movies/${props.match.params.id}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => setMovie(json));
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (

        <div className="details">

            <Header id={props.match.params.id} baseUrl={props.baseUrl} showBookShowButton />


            <Typography className="back">
                <Link to="/"> &#60; Back to Home </Link>
            </Typography>

            <div className="parent">
                {/* Movie poster */}
                <div className="left">
                    <Typography>
                        <img
                            src={movie.poster_url}
                            alt={movie.title}
                        />
                    </Typography>
                </div>

                {/* Detailed information about the movie */}
                <div className="middle">
                    {/* Movie title here */}
                    <Typography variant="heading" component="h2">
                        {movie.title}
                    </Typography>
                    {/* Movie genres here */}
                    <Typography className='font'>
                        Genre: {movie.genres}
                    </Typography>
                    {/* Total duartion of movie */}
                    <Typography className='font'>
                        Duration: {movie.duration}
                    </Typography>
                    {/* Release Date here */}
                    <Typography className='font'>
                        Released Date: {new Date(movie.release_date).toDateString()}
                    </Typography>
                    {/* Rating for the movie here */}
                    <Typography className='font'>
                        Rating: {movie.rating}
                    </Typography><br />
                    {/* Storyline of the movie here with link to wikipedia page of the movie */}
                    <Typography className='font'>
                        Plot: (
                        <a href={movie.wiki_url}>Wiki Link</a>
                        ) {movie.storyline}
                    </Typography>

                    {/* Youtube trailer of the movie here  */}
                    <Typography className='font'>
                        Trailer: <br />
                    </Typography>

                    <div className='trailer-box'>
                        {movie && movie.trailer_url && (
                            <YouTube
                                videoId={movie.trailer_url.split("v=")[1].split("&")[0]}
                                opts={opts}
                                onReady={(e) => { onPlayerReady }}
                            />
                        )}
                    </div>
                </div>

                <div className="right">
                    {/* Star rating component here */}
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
                    {/* Artist information here */}
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