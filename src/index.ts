// require('dotenv').config(); // using local .env file
import express from 'express';
import { router } from './apis/route';
import * as path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import { json } from 'body-parser';

const app: express.Application = express();
import session from 'express-session';
const port = 3000;
// const CACHECONTROL = '86400'; // CACHE assets for one day
import { corsOption } from './controllers/cors_controllers';
import { db } from './models/db';

db();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
app.use(
  session({
    secret: 'whyDonate',
    resave: true,
    saveUninitialized: true
  })
);
app.use('/api', cors(), router);

app.listen(port, function () {
  console.log(`App is listening on port  ${port}!`);
});

