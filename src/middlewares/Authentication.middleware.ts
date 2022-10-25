import JWT from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import config from '../config'
import { errorType } from '../interfaces/error.interface'

const authenticationError = (next: NextFunction) => {
    const ERR: errorType = new Error(`OOOPS!.. You Don't Have Access Token.`)
    ERR.status = 401
    next(ERR)
}

async function CheckToken(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader: string | undefined = req.get('Authorization') as string
        const Bearer = authHeader.split(' ')[0].toLowerCase()

        const token = authHeader.split(' ')[1]
        if (Bearer === 'bearer' && token) {
            const decoded = JWT.verify(token, config.tokenPassword as string)
            if (decoded) {
                next()
            } else {
                authenticationError(next)
            }
        } else {
            authenticationError(next)
        }
    } catch (Err) {
        res.status(401).json({ ErrorMessage: Err })
    }
}

export default CheckToken
