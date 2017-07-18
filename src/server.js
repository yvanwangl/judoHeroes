'use strict';

import path from 'path';
import { Server } from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import models from './graphql/models';
import schema from './graphql/schema';
import jwt from 'jsonwebtoken';
import PrettyError from 'pretty-error';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/universalBlog');

//env variable
const isDebug = process.env.NODE_ENV !== 'production';

// initialize the server and configure support for ejs templates
const app = express();
const server = new Server(app);

//set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));
//register node middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Register API middleware
app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: isDebug,
  rootValue: {request: req},
  pretty: isDebug
})));

//Register server-side rendering middleware, universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

// start the server
const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'production';

export {
  server,
  port,
  env
};