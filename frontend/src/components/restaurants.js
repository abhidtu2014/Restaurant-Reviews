import React, { useState, useEffect } from 'react'
import RestaurantDataService from '../services/restaurant'

import { Link } from 'react-router-dom'

const Restaurant = (props) => {
  const initialRestaurantState = {
    id: null,
    name: '',
    address: {},
    cuisine: '',
    reviews: []
  }

  const [restaurant, setRestaurant] = useState(initialRestaurantState)

  useEffect(() => {
    getRestaurant(props.match.params.id)
  }, [props.match.params.id])

  const getRestaurant = async (id) => {
    try {
      const result = await RestaurantDataService.get(id)
      setRestaurant(result.data)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteReview = async (reviewId, index) => {
    try {
      await RestaurantDataService.deleteReview(reviewId, props.user.id)
      setRestaurant((prevState) => {
        restaurant.reviews.splice(index, 1)
        return { ...prevState }
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong> {restaurant.cuisine} <br />
            <strong>Address: </strong> {restaurant.address.building}
            {restaurant.address.street}, {restaurant.address.zipcode}
          </p>
          <Link
            to={`/restaurants/${props.match.params.id}/review`}
            className='btn btn-primary'
          >
            Add Review
          </Link>
          <h4>Reviews</h4>
          {restaurant.reviews.length > 0 ? (
            restaurant.reviews.map((review, index) => {
              return (
                <div className='col-lg-4 pb-1' key={index}>
                  <div className='card'>
                    <div className='card-body'>
                      <p className='card-text'>
                        {review.text}
                        <br />
                        <strong>User: </strong> {review.name}
                        <br />
                        <strong>Date: </strong> {review.date}
                      </p>
                      {props.user && props.user.id === review.user_id && (
                        <div className='row'>
                          <a
                            onClick={() => deleteReview(review._id, index)}
                            className='btn btn-primary col-lg-5 mx-1 mb-1'
                          >
                            Delete
                          </a>
                          <Link
                            to={{
                              pathname: `/restaurants/${props.match.params.id}/review`,
                              state: {
                                currentReview: review
                              }
                            }}
                            className='btn btn-primary col-lg-5 mx-1 mb-1'
                          >
                            Edit
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='col-sm-4'>
              <p>No reviews yet.</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  )
}

export default Restaurant
