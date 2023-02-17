import { GridList, Typography, GridListTile, GridListTileBar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './Details.css';
import Header from '../../common/header/Header';
import StarBorderIcon from "@material-ui/icons/StarBorder";
// import Rating from '@material-ui/lab/Rating';

const Details = () => {

    const backToHome = "< Back to Home";
    
    
    // const [movie, setMovie] = useState([]);

    // useEffect(() => {
    //     fetch(
          
    //     )
    //       .then((response) => response.json())
    //       .then((data) => setMovie(data.results));
    //   }, []);
    
    const ratingStar = Array.from({length: 5}, (x, i) => {
        return (
            <span key={i} >
                <StarBorderIcon />
            </span>
        );
    });

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
                    {/* <img src={movie.poster_url} alt={movie.title} /> */}
                </div>
                <div className="middle">
                    
                </div>
                <div className="right">
                    <Typography style={{ fontWeight: 'bold' }}>
                        Rate this movie:
                    </Typography> 
                    <div >
                        {ratingStar}
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