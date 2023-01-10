const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

//TODO: REMOVE BEFORE DEPLOYMENT
const JWT_SECRET = 'rtUSnZXjdZuR6PwXCmyN0OUGcpxePI5KwzblSoOQPzA=';
const mongoUrl =
  'mongodb+srv://badbank:badbank@cluster0.og9udqp.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;
require('./userDetails.js');
const User = mongoose.model('UserInfo');

//SETS UP EXPRESS APP MIDDLEWARE TO USE JSON+CORS+URL ENCODING AND SERVE STATIC FILES FROM BUILD FOLDER OF REACT APP 
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//SERVES BADBANK REACT APP WITH ABOVE MIDDLEWARE 
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });

//CONNECTS TO MONGODB DATABASE USING MONGOOSE 
mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => console.log('Unable to connect to database', err));

//TODO:Display error message to user if email already exists

//HANDLES CREATION OF NEW USER ON SIGNUP
app.post('/register', async (req, res) => {
  const { name, email, password, balance } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
  const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.json({
        error:
          'Sorry, a user with this email is already registered. Please login or use a different email address.',
      });
    }

    await User.create({
      name,
      email,
      password: encryptedPassword,
      balance,
      transactionHistory: [],
    });
    res.send({ status: 'User succesfully created!' });
  } catch (error) {
    res.send({ status: 'Error' });
  }
});

//HANDLES LOGIN OF EXISTING USER
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: 'User not found...' });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: 'ok', data: token });
    } else {
      return res.json({ error: 'error' });
    }
  }
  res.json({ status: 'error', error: 'Invalid Password' });
});

//HANDLES VERIFICATION OF TOKEN
app.post('/userData', async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    User.findOne({ email: userEmail })
      .then((data) => {
        res.send({ status: 'ok', data: data });
      })
      .catch((error) => {
        res.send({ status: 'error', data: error });
      });
  } catch (error) {}
});

//HANDLES DEPOSIT UPDATE OF USER BALANCE
app.put('/updatebalance', async (req, res) => {
  const { token } = req.body;
  // Validate the token and user
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const newTotal = user.balance;
    User.findOneAndUpdate(
      { balance: newTotal },
      { $set: { balance: newTotal } },
      { new: true }
    );

    res.send({ status: 'Balance updated', data: updatedUser });
  } catch (error) {
    res.send({ error: error });
  }
});

app.listen(PORT, () => {
  console.log('Server successfully started on port 5000');
});
