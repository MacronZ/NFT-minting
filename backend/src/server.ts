import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import {
  userRouter, nullPointRouter, documentRouter, surveyRouter,
} from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URL;
const corsOptions = {
  credentials: true,
  origin: [
    'https://portal.axiancepartnerseu.com',
    'https://portal.axiancepartners.com',
    'https://dev-portal.axiancepartners.com',
    'https://dev-portal.axiancepartnerseu.com',
    'https://axiance-qa-portal.netlify.app',
    'https://ib-portal-dev.netlify.app',
    'https://everfx2.lightning.force.com',
    'https://everfx2--uat.lightning.force.com',
    'https://everfx2--dev.lightning.force.com',
    'http://localhost:3000',
  ],
};

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(mongoUri!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}, (err) => {
  if (err) {
    throw err;
  }
});

app.use('/nullpoint', nullPointRouter);
app.use('/document', documentRouter);
app.use('/survey', surveyRouter);
app.use('/users', userRouter);
app.get('/', (req, res) => {
  res.send('Should you really be here?');
});

app.listen(port, () => {
  console.log('Server running at:', chalk.magenta(`http://localhost:${port}/`));
});

module.exports = app;
