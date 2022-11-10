import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Config } from "../config";

export default async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
    let jwtToken = req.header('Authorization')

    if (!jwtToken) {
        return res.status(400).json({
            result: null,
            message: 'Missing Authorization header'
        })
    }

    if (jwtToken.includes(Config.getTokenType())) {
        jwtToken = jwtToken.replace(Config.getTokenType(), '').trim()
    }

    try {
        verify(jwtToken, Config.getJwtSecret())
    } catch(err: any) {
        console.error(err)

        return res.status(401).json({
            result: null,
            message: 'Failed to verify token',
        })
    }

    return next()
}