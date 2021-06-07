import React, { useState } from 'react'

const Login = (props) => {
  const initialState = {
    name: '',
    id: ''
  }

  const [user, setUser] = useState(initialState)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const login = () => {
    props.login(user)
    props.history.push('/')
  }

  return (
    <div className='submit-form'>
      <>
        <div className='form-control'>
          <label htmlFor='user'>Username</label>
          <input
            type='text'
            className='form-control'
            id='name'
            required
            value={user.name}
            onChange={handleInputChange}
            name='name'
          />
        </div>

        <div className='form-control'>
          <label htmlFor='user'>ID</label>
          <input
            type='text'
            className='form-control'
            id='id'
            required
            value={user.id}
            onChange={handleInputChange}
            name='id'
          />
        </div>

        <button onClick={login} className='btn btn-success'>
          Login
        </button>
      </>
    </div>
  )
}

export default Login
