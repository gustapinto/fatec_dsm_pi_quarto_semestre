import { Controller, Delete, Get, Middleware, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { ConnectionDoesNotExistsException } from "../exceptions/ConnectionDoesNotExistsException";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { ArduinoRepository } from "../repositories/ArduinoRepository";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

/**
 * Classe responsável pelas APIs de conexões entre arduinos e dispositivos
 * mobile
*/
@Controller('api/connections')
export class ConnectionsController {
    private arduinoRepository: ArduinoRepository
    private connectionsRepository: ConnectionsRepository

    constructor(arduinoRepository: ArduinoRepository, connectionsRepository: ConnectionsRepository) {
        this.arduinoRepository = arduinoRepository
        this.connectionsRepository = connectionsRepository
    }

    /**
     * Obtém todos os arduinos conectados com o dispositivo mobile passado
    */
    @Get(':androidId')
    async getArduinos(req: Request, res: Response): Promise<Response<any>|void> {
        const androidId = req.params.androidId as string

        try {
            const result = await this.connectionsRepository.getArduinosByConnectionAndroidId(androidId)

            return res.status(200).json({
                result: result,
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
     * Cria uma nova conexão entre o dispositivo mobile e o arduino
    */
    @Post()
    async createConnection(req: Request, res: Response): Promise<Response<any>|void> {
        const androidId = req.body.androidId as string
        const arduinoCode = req.body.arduinoCode as string

        try {
            await this.connectionsRepository.createConnection(androidId, arduinoCode)

            return res.status(200).json({
                result: null,
                message: `Success creating a new connection between ${androidId} and ${arduinoCode}`,
            })
        } catch(error: any) {
            return res.status(500).json({
                result: null,
                message: error.message,
            })
        }
    }

    /**
     * Remove uma conexão entre o dispositivo mobile e o arduino
    */
    @Delete()
    @Middleware([AuthMiddleware])
    async removeConnection(req: Request, res: Response): Promise<Response<any>|void> {
        const androidId = req.body.androidId as string
        const arduinoCode = req.body.arduinoCode as string

        console.log(androidId, arduinoCode)

        try {
            await this.connectionsRepository.removeConnection(androidId, arduinoCode)

            return res.status(200).json({
                result: null,
                message: `Success deleting the connection between ${androidId} and ${arduinoCode}`
            })
        } catch(error: any) {
            if (error instanceof ConnectionDoesNotExistsException) {
                return res.status(400).json({
                    result: null,
                    message: `The is no connection between ${androidId} and ${arduinoCode}`,
                })
            }

            return res.status(500).json({
                result: null,
                message: error.message,
            })
        }
    }

    /**
     * Verifica se existe uma conexão existente para o mac address passado
    */
    @Get('check/:androidId')
    async verifyIfConnectionExists(req: Request, res: Response): Promise<Response<any>|void> {
        const androidId = req.params.androidId as string

        try {
            const connectionExists = await this.connectionsRepository.exists(androidId)
            const message = connectionExists
                ? `A connection for ${androidId} exists`
                : `The is no connection for ${androidId}`

            return res.status(200).json({
                result: connectionExists,
                message: message,
            })
        } catch(error: any) {
            return res.status(500).json({
                result: null,
                message: error.message,
            })
        }
    }
}