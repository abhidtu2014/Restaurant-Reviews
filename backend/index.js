import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import RestaurantsDAO from './dao/restaurantsDAO.js'
import ReviewsDao from './dao/reviewsDAO.js'

dotenv.config()

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
  process.env.RESTREVIEWS_DB_URI,

  {
    poolSize: 500,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .catch((err) => {
    console.log(err.stack)
    process.exit(1)
  })
  .then(async (client) => {
    await RestaurantsDAO.injectDB(client)
    await ReviewsDao.injectDB(client)
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  })
