import axios from 'axios'

export default axios.create({
  baseURL: 'https://ap-south-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/restaurant-reviews-bynzc/service/restaurants/incoming_webhook/',
  headers: {
    'Content-Type': 'application/json'
  }
})
