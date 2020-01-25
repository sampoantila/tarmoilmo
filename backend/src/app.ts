import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import authenticate from './routes/authenticate';
import logger from 'morgan';

process.on('uncaughtException', e => {
    console.log(e);
    process.exit(1);
});

process.on('unhandledRejection', e => {
    console.log(e);
    process.exit(1);
});

const app = express();

app.use(cors());
app.use(logger('dev'));

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup headers for CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//var api_key = process.env.SENDGRID_API_KEY;

app.use('/', routes);
app.use('/authenticate', authenticate);



// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  res.statusCode = 404;
  next(err);
});

app.set('port', process.env.PORT || 4000);
const PORT = app.get('port');

app.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}...`));
