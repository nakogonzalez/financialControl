const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const path = require('path')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const jwt = require('jsonwebtoken')

const app = express()

const PORT = process.env.PORT || 3001

//This will create a middleware.
//When you navigate to the root page, it would use the built react-app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, "../client/dist")))
}

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


// const db = mysql.createConnection({
//     user: 'b7d2b03308013f',
//     host: 'us-cdbr-east-05.cleardb.net',
//     password: '23e5efaa',
//     database: 'heroku_86ff072394cdc7c'
// })

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'LoginSystem'
})


const authenticateToken = (req, res, next) => {
    const token = req.cookies['access-token']

    if(!token) res.sendStatus(401)

    jwt.verify(token, 'jwtSecret', (err, user) => {
      if (err) {
        res.json({auth: false, message: 'You failed to Auth'})
      } else {
        req.userId = user.id
        next()
      }
    })
}

app.get('/', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

  
app.post('/', (req,res) => {
    const {username, password} = req.body

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username,password],
        (err, result) => {
            if(err) {
                res.send({err})
            } else {
                if(result.length > 0) {
                    const id = result[0].id
                    const accessToken = jwt.sign({id}, 'jwtSecret')
                    
                    req.session.user = result;
                    console.log(result)
                    
                    res.json({auth: true, token: accessToken, result: result}); 
                } else {
                  res.json({auth: false, message: 'El usuario/contraseña no existe'}); 
                }
            }
        }
    )
})


app.listen(PORT,() => {
    console.log(`Running server on ${PORT}`)
})