const express = require('express');
const cors = require("cors");
const session = require('express-session');
const path = require('path');
const bodyParser = require("body-parser");
const congraModel = require('./src/models/info.model')
const {connectDB} = require('./src/config/config');
require('dotenv').config();

// const port = process.env.PORT || 3000;

connectDB();

var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'hdhsgHHAHDG',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 360000000, // 1 hour
    },
  })
);



const createCongratulation = async (req, res) => {
  try {
    const newCongra = req.body;
    console.log(newCongra);
    const congra = await congraModel.create({ ...newCongra });
    return res.status(201).json(congra);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getCongratulation = async (req, res) => {
  try {
    const congra = await congraModel.find();
    return res.render('pages/index', { congra });
    // res.json({
    //   status: 200,
    //   message: congra,
    //   log: "connect successful"
    // });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const showLoginPage = (req, res) => {
  res.render('authen/login');
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (checkLogin(username, password)) {
    req.session.loggedin = true;
    res.redirect('/admin');
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

function checkLogin(username, password) {
  const adminUsername = 'admin';
  const adminPassword = process.env.PASSADMIN;

  if (username === adminUsername && password === adminPassword) {
    return true;
  }
  return false;
}

const getAdmin = async (req, res) => {
  if (!req.session.loggedin) {
    return res.redirect('/login');
  }
  try {
    const dataUser = await congraModel.find();
    return res.render('admin/index', { dataUser });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

app.get('/admin', getAdmin);
app.get('/login', showLoginPage);
app.post('/login', login);
app.post('/api/congratulations', createCongratulation);
app.get('/', getCongratulation);

app.listen(3007, function () {
  console.log(`Example app listening on port 3000`);
});
