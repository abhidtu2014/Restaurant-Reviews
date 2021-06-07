import express from 'express'
import RestaurantsController from './restaurants.controller.js'
import ReviewsController from './reviews.controller.js'

const router = express.Router()

router.route('/').get(RestaurantsController.apiGetRestaurants)
router.route('/id/:id').get(RestaurantsController.apiGetRestaurantsById)
router.route('/cuisines').get(RestaurantsController.apiGetCuisines)

router
  .route('/review')
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiPutReview)
  .delete(ReviewsController.apiDeleteReview)

export default router
