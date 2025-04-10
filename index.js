/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const db = require("./models/");

dotenv.config();


const app = express();

const port = process.env.PORT || 3000;



app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

/*
app.get('/', (req, res) => {
  res.send('Hello World!');
});*/

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
  
  
db.sequelize.sync({
    // force: true // drop tables and recreate
  }).then(() => {
    console.log("db resync");
});
  
  
require("./routes")(app);
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});