'use strict'

// app dependiencies
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();

// get project enviroment variables
require('dotenv').config();

// app middleware
app.use(cors());

// ===========================Location api=======================================
app.get('/location', (req, res) => {
  searchToLatLong(req.query.data)
    .then(location => res.send(location))
    .catch(error => handleError(error, res));
});

function Location(query, res) {
  this.latitude = res.body.results[0].geometry.location.lat;
  this.longitude = res.body.results[0].geometry.location.lng;
  this.formatted_query = res.body.results[0].formatted_address;
  this.search_query = query;
}

function searchToLatLong(query) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${process.env.GEOCODE_API_KEY}`;

  return superagent.get(url)
    .then(res => {
      return new Location(query, res);
    })
    .catch(error => handleError(error));
}

// ==============================Weather Api==========================================
function Weather(day) {
  this.forecast = day.summary;
  this.time = new Date(day.time * 1000).toDateString();
}

app.get('/weather', getWeather);

function getWeather(req, res) {
  const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${req.query.data.latitude},${req.query.data.longitude}`;

  superagent.get(url)
    .then(result => {
      const weatherSummaries = result.body.daily.data.map(day => {
        return new Weather(day);
      });
      res.send(weatherSummaries);
    })
    .catch(error => handleError(error));
}
// ==============================Restraunt Api==========================================
function Yelp(businesses) {
  this.name = businesses.name;
  this.image_url = businesses.image_url;
  this.price = businesses.price;
  this.rating = businesses.rating;
  this.url = businesses.url;
}

app.get('/yelp', getBusiness);

function getBusiness(req, res) {
  superagent.get(`https://api.yelp.com/v3/businesses/search?location=${req.query.data.search_query}/${req.query.data.latitude},${req.query.data.longitude}`)
    .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
    .then(result => {
      const getBusiness = result.body.businesses.map(business => {
        return new Yelp(business);
      });
      res.send(getBusiness);
    })
    .catch(error => handleError(error));
}

// =============================Movie API==============================================
function Movie(movie) {
  this.title = movie.title;
  this.creation_date = movie.creation_date;
  this.overview = movie.overview;
  this.average_votes = movie.average_votes;
  this.total_votes = movie.total_votes;
  this.image_url = 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + movie.poster_path;
  this.popularity = movie.popularity;
  this.release_on = movie.release_on;
}

app.get('/movies', getMovie);

function getMovie(req, res) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${req.query.data.search_query}`;
  superagent.get(url)
    .then(result => {
      const movieSum = result.body.results.map(movie => {
        return new Movie(movie);
      });
      res.send(movieSum);
    })
    .catch(error => handleError(error));
}

// Error Handler
function handleError(err, res) {
  console.error(err);
  if (res) res.satus(500).send('Sorry, something broke');
}

// **************a test route that gives you turtle tim.*****************
// app.get('/testroute', function (req, res) {
//     let animal = { type: 'turtle', name: 'tim' };
//     res.json(animal);
// });

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
