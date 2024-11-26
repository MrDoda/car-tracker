import { Router } from 'express'
import { ExampleService } from './example.service'

export const helloWorldRouter = Router()

helloWorldRouter.post('/hello-world', ExampleService.helloWorld)
