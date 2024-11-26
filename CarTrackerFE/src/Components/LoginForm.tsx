import React, { useState } from 'react'
import { useAuthentication } from '../hooks/useAuthentication'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'

const LoginForm: React.FC = () => {
  const { login } = useAuthentication()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const credentials = { email, password }
    const result = await login(credentials)
    if (result) {
      console.log('Login successful:', result)
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label={'Email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <TextField
          label={'Password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Login</Button>
      <Button onClick={() => navigate('/register')}>Register</Button>
    </form>
  )
}

export default LoginForm
