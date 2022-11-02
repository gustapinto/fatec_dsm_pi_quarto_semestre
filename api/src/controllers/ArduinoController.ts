// Importações da biblioteca de servidor
import { Controller, Get, Middleware, Post } from "@overnightjs/core"
import { Request, Response } from "express"
import AuthMiddleware from "../middlewares/AuthMiddleware"
import { ArduinoRepository } from "../repositories/ArduinoRepository"

/**
 * Controller responsável por criar e apagar registros das placas arduino
*/
@Controller('api/arduino')
export class ArduinoController {
    private repository: ArduinoRepository

    constructor(repository: ArduinoRepository) {
        this.repository = repository
    }

    /**
     * Salva dados no banco de dados
    */
    @Post()
    async createArduino(req: Request, res: Response): Promise<Response<any>|void> {
        // Pegando os dados do corpo da requisição
        const body = req.body
        const code = body.code as number
        const name = body.name as string

        try {
            await this.repository.createArduino(code, name)

            return res.status(200).json({
                result: null,
                message: 'Success creating a new record'
            })
        } catch(error: any) {
            return res.status(500).json({
                result: null,
                message: error.message
            })
        }
    }

    /**
     * Obtém as placas salvas no banco de daos
    */
    @Get()
    @Middleware([AuthMiddleware])
    async getArduino(_: Request, res: Response): Promise<Response<any>|void> {
        try {
            const arduinos = await this.repository.getAllArduinos()

            return res.status(200).json({
                result: arduinos,
                message: '',
            })
        } catch(error: any) {
            return res.status(500).json({
                result: null,
                message: error.message,
            })
        }
    }
}
