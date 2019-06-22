require('dotenv').config();
var axios = require('axios');
var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var config = require('./config')

// Convenience for allowing CORS on routes - GET only
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.set('views', './views');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/oauth', function (req, res) {
  console.log('oauth route runs');
  // const GITHUB_AUTH_ACCESSTOKEN_URL = 'https://github.com/login/oauth/access_token'
  const CODE = req.query.code

  console.log('CODE :', CODE);

  axios({
    method: 'post',
    url: config.oauth_host + config.oauth_path,
    data: {
      client_id: config.oauth_client_id,
      client_secret: config.oauth_client_secret,
      code: CODE
    },
  })
  .then(({data}) => {
    console.log('Success ' + data)
    if (data.includes('access_token')) {
      res.send(data)
    }
  })
  .catch((error) => {
    console.error('Error ' + error.message)
  })
});

app.listen(config.port, function () {
  console.log('github oauth redirect server is listening on port 9999!');
});