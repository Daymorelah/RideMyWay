
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import jsend from 'jsend';
import routes from './Routes';

const PORT = process.env.PORT || 2033;
const app = express();

if (app.get('env') !== 'test') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(jsend.middleware);

routes(app);

app.listen(PORT, (error) => {
  /* eslint-disable no-console */
  if (error) {
    console.log(`An error occurred try to start the sever. Error is ${error}`);
  } else {
    console.log(`Server is up and runnig on port ${PORT} ...`);
  }
});

export default app;
