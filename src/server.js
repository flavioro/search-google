const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = 3000;

const searchGoogle = require('./searchGoogle');
const google = require('./search-npm-Google');

app.get('/google', (request, response) => {

  console.log(google.google)
});

//Catches requests made to localhost:3000/
app.get('/', (req, res) => res.send('Hello World!'));


//Catches requests made to localhost:3000/search
app.get('/search', (request, response) => {

  //Holds value of the query param 'searchquery' 
    const searchQuery = request.query.searchquery;

  //Do something when the searchQuery is not null.
  if(searchQuery != null){
    searchGoogle(searchQuery)
    .then(results => {
        //Returns a 200 Status OK with Results JSON back to the client.
        response.status(200);
        response.json(results);
        console.log(results);
        console.log(response);
    });
  }else{
    response.end();
  }
});

//Initialises the express server on the port 30000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));