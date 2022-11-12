// Importações da biblioteca de servidor
import { Controller, Delete, Get, Middleware, Post, Put } from "@overnightjs/core"
import { Request, Response } from "express"
import { ArduinoDoesNotExistsException } from "../exceptions/ArduinoDoesNotExistsException"
import AuthMiddleware from "../middlewares/AuthMiddleware"
import { ArduinoRepository } from "../repositories/ArduinoRepository"
import { RecordRepository } from "../repositories/RecordRepository"

/**
 * Controller responsável por criar e apagar registros das placas arduino
*/
@Controller('api/arduino')
export class ArduinoController {
    private repository: ArduinoRepository
    private recordRepository: RecordRepository

    constructor(repository: ArduinoRepository, recordRepository: RecordRepository) {
        this.repository = repository
        this.recordRepository = recordRepository
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

    /**
     * Atualiza a placa arduino a partir dos dados passados
    */
    @Put(':code')
    @Middleware([AuthMiddleware])
    async updateArduino(req: Request, res: Response): Promise<Response<any>|void> {
        const arduinoCode = req.params.code as string
        const arduinoNewCode = req.body.code as number
        const arduinoNewName = req.body.name as string

        try {
            await this.repository.updateArduino(arduinoCode, arduinoNewCode, arduinoNewName)

            return res.status(200).json({
                result: null,
                message: 'Success updating the record'
            })
        } catch(error: any) {
            if (error instanceof ArduinoDoesNotExistsException) {
                return res.status(400).json({
                    result: null,
                    message: `The arduino ${arduinoCode} does not exist, please try again with another arduino code`
                })
            }

            return res.status(500).json({
                result: null,
                message: error.message,
            })
        }
    }

    /**
     * Remove a placa arduino do banco de dados junto com todos os registros de
     * temperatura associados
    */
    @Delete(':code')
    @Middleware([AuthMiddleware])
    async deleteArduino(req: Request, res: Response): Promise<Response<any>|void> {
        const arduinoCode = req.params.code as string

        try {
            await this.recordRepository.deleteRecordWithArduinoCode(arduinoCode)
            await this.repository.deleteArduino(arduinoCode)

            return res.status(200).json({
                result: null,
                message: 'Success deleting the arduino and records'
            })
        } catch(error: any) {
            if (error instanceof ArduinoDoesNotExistsException) {
                return res.status(400).json({
                    result: null,
                    message: `The arduino ${arduinoCode} does not exist, please try again with another arduino code`
                })
            }

            return res.status(500).json({
                result: null,
                message: error.message,
            })
        }
    }
}
