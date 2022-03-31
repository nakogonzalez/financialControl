const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const fs = require('fs')
const { createServer: createViteServer } = require('vite')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const jwt = require('jsonwebtoken')

const app = express()

async function createServer() {
  // Create Vite server in middleware mode. This disables Vite's own HTML
  // serving logic and let the parent server take control.
  //
  // In middleware mode, if you want to use Vite's own HTML serving logic
  // use `'html'` as the `middlewareMode` (ref https://vitejs.dev/config/#server-middlewaremode)
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })
  // use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
  
    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, 'dist/client/index.html'),
        'utf-8'
      )
  
      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template)
  
      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const { render } = require('./dist/server/index.js')
  
      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = await render(url)
  
      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)
  
      // 6. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // If an error is caught, let Vite fix the stracktrace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })
}

createServer()



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