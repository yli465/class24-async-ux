import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from "helmet"
import { rateLimit } from 'express-rate-limit'
import { MongoClient, ObjectId } from 'mongodb';
const port = process.env.PORT || 8080
const app = express()
app.set('trust proxy', 1)
app.use(cors())
app.use(helmet())
app.use(express.json())
app.disable('x-powered-by')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
})
app.use(limiter)


// path to the public folder
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.locals.publicPath = path.join(__dirname, 'public')

// log every request to the console
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('>', req.method, req.path + (Object.keys(req.query).length > 0 ? `?${new URLSearchParams(req.query).toString()}` : ''))
  next()
})

// Delay every request by a few seconds (helps to demonstrate that data is coming from another source.)
app.use((req, res, next) => {
  // DO NOT REMOVE. DO NOT MODIFY.
  const delay = 1 * 1000
  setTimeout(() => {
    next()
  }, delay)
})

///////////////////////////////////////////

// ---> Change nothing above this line <---


// Connect to MongoDB
const client = new MongoClient(process.env.MONGODB_URI)
try {
  const conn = await client.connect()
  // Keep the database reference available for future routes.
  app.locals.db = conn.db('app')
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('failed to connect to mongodb:', error)
  process.exit(1)
}


// GET / or GET /index.html
app.get(['/', '/index.html'], (req, res) => {
  // serve the index.html file located in publicPath
  res.sendFile(path.join(app.locals.publicPath, 'index.html'))
})

// GET /styles/site.css
app.get('/styles/site.css', (req, res) => {
  // serve the file located in publicPath
  // res.sendFile(path.join(publicPath, "/styles/site.css"))
  res.sendFile(path.join(app.locals.publicPath, req.route.path))
})

// GET /api/produce
app.get('/api/produce', async (req, res) => {

  // query parameters
  const countryParam = req.query.country;
  const categoryParam = req.query.category;

  // Build filter based on provided query parameters
  let query = {};
  if (countryParam) {
    query.country = countryParam;
  }
  if (categoryParam) {
    query.category = categoryParam;
  }

  const documents = await app.locals.db.collection('produce')
    .find(query)
    .collation({ locale: 'en', strength: 2 })
    .toArray()

  // rename _id to id and convert ObjectId to string
  const jsonResponse = documents.map(({ _id, ...rest }) => ({
    id: _id.toString(),
    ...rest
  }))

  res.status(200).json(jsonResponse)
})

// GET /api/produce/:id
app.get('/api/produce/:id', async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const id = new ObjectId(req.params.id);
    const produce = await app.locals.db.collection('produce').findOne({ _id: id });

    if (produce) {
      // rename _id to id and convert ObjectId to string
      const jsonResponse = {
        id: produce._id.toString(),
        ...produce
      }

      res.status(200).json(jsonResponse);
    } else {
      res.status(404).send()
    }
  } else {
    res.status(404).send();
  }
});


///////////////////////////////////////////

// ---> Change nothing below this line <---

/* eslint-disable no-console, no-unused-vars */

// 404 - not found
app.use((req, res, next) => {
  res.status(404).json({ message: 'resource ' + req.url + ' not found' })
})

// 500 - Any server error
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send()
})

// start server on port
const server = app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}/`)
})
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`error: port ${port} is already in use!`, 'kill this server! (control + c)')
    process.exit(1)
  } else {
    console.error('server error:', error)
  }
})
