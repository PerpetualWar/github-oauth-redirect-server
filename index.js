require('dotenv').config();
var axios = require('axios');
var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var config = require('./config')

//cors headers
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//template engine added
app.set('views', './views');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//route to get acess_token
app.get('/oauth', async function (req, res) {
  const code = req.query.code

  try {
    const { data } = await axios({
      method: config.oauth_method,
      url: config.oauth_host + config.oauth_path,
      data: {
        client_id: config.oauth_client_id,
        client_secret: config.oauth_client_secret,
        code
      },
    });
    
    if (data.includes('access_token')) {
      res.send(data)
    }
  } catch (error) {
    console.error('Error ' + error.message)
  }
});

//server init
app.listen(config.port, function () {
  console.log(`github oauth redirect server is listening on port ${config.port}!`);
});