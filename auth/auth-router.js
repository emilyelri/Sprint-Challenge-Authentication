const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./auth-model');
const secrets = require('../config/secrets');

router.post('/register', validateUser, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  db.add(user)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => res.status(500).json({message: 'Unable to register user.', error: err}));
});

router.post('/login', validateUser, (req, res) => {
  let { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {

        const token = generateToken(user);

        res.status(200).json({message: `Welcome, ${user.username}!`, token: token});
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(err => res.status(500).json({message: 'Unable to log in.', error: err}));
});

function generateToken(user) { 
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

function validateUser(req, res, next) {
  const user = req.body;
  !user.username && res.status(400).json({ message: 'Please provide a username.' })
  !user.password && res.status(400).json({ message: 'Please provide a password.' })
  next();
}

module.exports = router;
