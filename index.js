const express = require('express');
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");
const congraModel = require('./src/models/info.model')
const {connectDB} = require('./src/config/config');

// const port = process.env.PORT || 3000;

connectDB();

var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const createCongratulation = async (req, res) => {
  try {
    const newCongra = req.body;
    const congra = await congraModel.create({ ...newCongra });
    return res.status(201).json(congra);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getCongratulation = async (req, res) => {
  try {
    const congra = await congraModel.find();
    // return res.render('pages/index', { congra });
    res.json({
      status: 200,
      message: congra,
      log: "connect successful"
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// app.post('/', createCongratulation);
app.get('/', getCongratulation);

// app.get('/', function(req, res) {
//   res.render('./pages/index');
// });

app.listen(3000, function () {
  console.log(`Example app listening on port 3000`);
});
