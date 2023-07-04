const express = require('express');
const cors = require("cors");
const app = express();
const session = require('express-session');
const path = require('path');
const bodyParser = require("body-parser");
const congraModel = require('./src/models/info.model')
const {connectDB} = require('./src/config/config');
require('dotenv').config();

// const port = process.env.PORT || 3000;

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'FHJSH7879879sfsdjfjsd',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: 'auto',
    maxAge: 100 * 24 * 60 * 60 * 1000 // 100 days in milliseconds
  }
}));

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
    return res.render('pages/index', { congra });
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

const updateActions = async (req, res) => {
  const actions = req.body;

  try {
    const updatedUsers = await Promise.all(actions.map(async (action) => {
      const { id } = action;
      const user = await congraModel.findById(id);
      if (user) {
        await congraModel.findByIdAndUpdate(id, { $set: { ...action } });
        return user;
      } else {
        throw new Error(`User not found with id: ${id}`);
      }
    }));

    res.json({ success: true, message: "Trạng thái isVisible đã được cập nhật", data: updatedUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Có lỗi xảy ra khi cập nhật trạng thái isVisible", error: error });
  }
};

app.get('/admin', getAdmin);
app.post('/admin', updateActions);
app.get('/login', showLoginPage);
app.post('/login', login);
app.post('/api/congratulations', createCongratulation);
app.get('/', getCongratulation);

app.listen(3008, function () {
  console.log(`Example app listening on port 3000`);
});

