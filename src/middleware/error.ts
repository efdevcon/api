import { Request, Response, NextFunction } from 'express'

export const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  console.error(error.message, error.stack)

  response.status(500).send({
    status: 500,
    message: 'Unexpected Error',
  })
}
