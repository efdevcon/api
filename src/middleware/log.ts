import { Request, Response, NextFunction } from 'express'

export const logHandler = (request: Request, response: Response, next: NextFunction) => {
  console.log(`${request.method} ${request.path}`)

  next()
}
