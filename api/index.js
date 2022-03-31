const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
)

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24,
      },
    })
  );

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'Login'
})

app.get('/', (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token']

  if(!token) {
    res.send('Yo, we need a token')
  } else {
    jwt.verify(token, 'jwtSecret', (err, decoded) => {
      if (err) {
        res.json({auth: false, message: 'You failed to Auth'})
      } else {
        req.userId = decoded.id
        next()
      }
    })
  }
}

app.get('/isUserAuth', verifyJWT, (req, res) => {
  res.send('You are Auth Congrats!')
})



app.post('/', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if(err) {
                res.send({err: err})
            }
            if (result.length > 0) {
                const id = result[0].id
                const token = jwt.sign({id}, 'jwtSecret', {
                  expiresIn: 300,
                })
                req.session.user = result;
                
                res.json({auth: true, token: token, result: result}); 
            } else {
              res.json({auth: false, message: 'El usuario/contraseña no existe'}); 
            }
        }
    )
})

app.listen(3001, () => {
    console.log('running server')
})