import type Express from 'express'

export const ExampleService = {
  helloWorld: async (req: Express.Request, res: Express.Response) => {
    const { helloName } = req.body
    return res.send({ message: 'Hello world!, ' + helloName })
  },
}
