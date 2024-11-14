import express from 'express'
import cors from 'cors'
import { authRouter } from './components/Auth/auth.routes'
import { userRouter } from './components/User/user.routes'
import { authenticateToken } from './middlewares/authenticateToken.middleware'
import { isAdminMiddleware } from './middlewares/isAdmin.middleware'
import { helloWorldRouter } from './components/Example/example.routes'

export const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/example', helloWorldRouter)
app.use('/user', authenticateToken, isAdminMiddleware, userRouter)
