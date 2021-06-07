import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RestaurantDataService from '../services/restaurant'

const AddReview = (props) => {
  let initialReviewState = ''
  let editing = false

  if (props.location.state && props.location.state.currentReview) {
    editing = true
    initialReviewState = props.location.state.currentReview.text
  }

  const [review, setReview] = useState(initialReviewState)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e) => {
    setReview(e.target.value)
  }

  const saveReview = async () => {
    let data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: props.match.params.id
    }

    try {
      if (editing) {
        data.review_id = props.location.state.currentReview._id
        await RestaurantDataService.updateReview(data)
      } else {
        await RestaurantDataService.createReview(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitted(true)
    }
  }

  return (
    <>
      {props.user ? (
        <div className='submit-form'>
          {submitted ? (
            <div>
              <h4>You have submitted succefully!</h4>
              <Link
                to={`restaurant/${props.match.params.id}`}
                className='btn btn-success'
              >
                Back to Restaurant
              </Link>
            </div>
          ) : (
            <>
              <div className='form-group'>
                <label htmlFor='description'>
                  {editing ? 'Edit' : 'Create'} Review
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='text'
                  required
                  value={review}
                  onChange={handleInputChange}
                  name='text'
                />
              </div>
              <button onClick={saveReview} className='btn btn-success'>
                Submit
              </button>
            </>
          )}
        </div>
      ) : (
        <div>Please Log in.</div>
      )}
    </>
  )
}

export default AddReview
