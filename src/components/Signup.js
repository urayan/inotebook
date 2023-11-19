import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import alertContext from '../context/notes/AlertContext';

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate()

  const context = useContext(alertContext);
  const { showAlert } = context;

  const handleSubmit = async (e) => {
    const { name, email, password } = credentials
    e.preventDefault();
    try {
      const response = await fetch(`/api/auth/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken)
        navigate('/')
        showAlert("Signed in successfully", "success")
      } else {
        showAlert("Check your credentials", "danger")
      }
    } catch (error) {
      console.error('Error adding data:', error);
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='container my-3'>
        <h2>Please Signup To Continue</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" minLength={3} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" minLength={5} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="password" minLength={5} onChange={onChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </div>
    </>
  )
}

export default Signup
