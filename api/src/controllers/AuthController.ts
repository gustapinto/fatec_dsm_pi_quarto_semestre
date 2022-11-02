import { Controller, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { Config } from "../config";
import { ArduinoRepository } from "../repositories/ArduinoRepository";

/**
 * Controller responsável por lidar com a autenticação de usuários
*/
@Controller('api/auth')
export class AuthController {
    private repository: ArduinoRepository

    constructor(arduinoRepository: ArduinoRepository) {
        this.repository = arduinoRepository
    }

    /**
     * Realiza a autenticação do usuário
    */
    @Post()
    async login(req: Request, res: Response): Promise<Response<any>> {
        const code = req.body.arduinoCode!
        const doesCodeExists = await this.repository.exists(code)

        if (doesCodeExists) {
            const payload = {
                arduinoCode: code
            }
            const token = sign(payload, Config.getJwtSecret(), {
                expiresIn: 3600,
            })

            return res.status(200).json({
                result: {
                    type: Config.getTokenType(),
                    token: token,
                },
                message: 'Authentication with success'
            })
        }

        return res.status(401).json({
            result: null,
            message: 'Login failed',
        })
    }
}
