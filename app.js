import express from 'express';
import bodyParser from 'body-parser';

import router from './routes/index.js';

// Set up the express app
const app = express();

//Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);


// Set up the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Yoh, Sagini, the server is running on port ${PORT}`)
});
