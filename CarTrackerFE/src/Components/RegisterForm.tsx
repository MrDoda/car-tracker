import React, { useState } from 'react'
import { useAuthentication } from '../hooks/useAuthentication'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const RegisterForm: React.FC = () => {
  const { register } = useAuthentication()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const userDetails = { name, email, password }
    const result = await register(userDetails)
    if (result) {
      console.log('Registration successful:', result)
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label={'Name'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
      <Button onClick={() => navigate('/login')}>Login</Button>
      <Button type="submit">Register</Button>
    </form>
  )
}

export default RegisterForm
