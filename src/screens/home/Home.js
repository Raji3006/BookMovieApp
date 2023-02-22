
import React from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import ReleasedMovies from './releasedmovies/ReleasedMovies';
import { CardContent, Typography, Card, FormControl, CardActionArea } from '@material-ui/core';
import { TextField, ListItemText, InputLabel } from '@material-ui/core';
import { Button, ListItem, Select, Checkbox, MenuItem } from '@material-ui/core';


function Home(props) {

    const Genres = [
      'Drama',
      'Romance',
      'Horror',
      'Action',
      'Crime',
      'Thriller'
    ];

    

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
            {/*<CardActionArea class="card">*/}
              <CardContent class="card">
                <Typography class="findMovies" color='theme.palette.primary.light'>FIND MOVIES BY:</Typography><br/>
                <FormControl >
                  <TextField id="standard-basic" label="Movie Name" placeholder='Movie Name' />
                  {/*<TextField id="standard-basic" label="Genres" placeholder='Genres' />*/}
                  <InputLabel id="demo-multiple-checkbox-label">Genres</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    placeholder='Genres'
                    value={Genres}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {Genres.map((genre) => (
                      <MenuItem >
                        <Checkbox />
                        <ListItemText primary={genre} />
                      </MenuItem>
                    ))}
                  </Select>
                  <br/>

                  <Button variant="contained" color="primary">APPLY</Button>
                  
                </FormControl>
              </CardContent>
            {/*</CardActionArea>*/}
            
          </Card>
        </div>

    </div>
  );
}


export default Home;