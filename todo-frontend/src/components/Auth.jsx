import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap'
import axios from 'axios'
import { FaUser, FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from 'react-icons/fa'

export default function Auth({ onLogin }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    const url = isLogin
      ? 'http://127.0.0.1:8000/api/login/'
      : 'http://127.0.0.1:8000/api/register/'

    try {
      const payload = isLogin
        ? { username, password }
        : { username, email, password }

      const response = await axios.post(url, payload)
      if (isLogin) {
        localStorage.setItem('access', response.data.access)
        localStorage.setItem('refresh', response.data.refresh)
        onLogin(username)
      } else {
        setMessage('Registration successful, please log in')
        setIsLogin(true)
      }
    } catch (error) {
      console.error(error)
      setMessage('Error: ' + (error.response?.data?.detail || 'Something went wrong'))
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-card">
          <div className="auth-card-body">
            <h1 className="auth-title">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            {message && (
              <Alert color={message.includes('Error') ? 'danger' : 'success'} className="mb-4">
                {message}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              {!isLogin && (
                <FormGroup className="auth-form-group">
                  <Label for="email" className="auth-label">
                    <FaEnvelope className="auth-icon" />
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="auth-input"
                  />
                </FormGroup>
              )}
              <FormGroup className="auth-form-group">
                <Label for="username" className="auth-label">
                  <FaUser className="auth-icon" />
                  Username
                </Label>
                <Input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="auth-input"
                />
              </FormGroup>
              <FormGroup className="auth-form-group">
                <Label for="password" className="auth-label">
                  <FaLock className="auth-icon" />
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="auth-input"
                />
              </FormGroup>
              <Button type="submit" className="auth-button">
                {isLogin ? (
                  <>
                    <FaSignInAlt className="auth-icon" /> Login
                  </>
                ) : (
                  <>
                    <FaUserPlus className="auth-icon" /> Register
                  </>
                )}
              </Button>
              <div className="text-center">
                <Button
                  type="button"
                  color="link"
                  className="auth-link"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}