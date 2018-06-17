
import express from 'express';

import bodyParser from 'body-parser';
import logger from 'morgan';

const PORT = 2033
let app = express();

if(app.get('env') !== 'test'){
  app.use(logger('dev'));
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('*', (req, res) => {
  res.status(200).send("Everything wokring as expected. We are good to go!!")
})

app.listen(PORT, (error) => {
  if(error){
    console.log(`An error occurred try to start the sever. Error is ${error}`);
  } else {
  console.log(`Server is up and runnig on port ${PORT} ...`);
  }
})