import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

let mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  methodOverride = require('method-override'),
  expressJwt = require('express-jwt'),
  morgan = require('morgan'),
  cors = require('cors');


/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  watchOptions: {
    poll: true
  }
}));

app.use(require('webpack-hot-middleware')(compiler));


/* *********jwt settings********* */


// ENVIRONMENT CONFIG
let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
	envConfig = require('../server/env')[env];

mongoose.connect(envConfig.db);

// EXPRESS CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));


// JWT config
let jwtSecret = 'thupers3crT$12';
app.set('superSecret', jwtSecret);

// ROUTES
require('../server/routes')(app);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'), {
      user: req.user
    });
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
