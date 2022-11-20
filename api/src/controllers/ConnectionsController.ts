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
    @Get(':macAddress')
    async getArduinos(req: Request, res: Response): Promise<Response<any>|void> {
        const macAddress = req.params.macAddress as string

        try {
            const result = await this.connectionsRepository.getArduinosByConnectionMacAddress(macAddress)

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
        const macAddress = req.body.macAddress as string
        const arduinoCode = req.body.arduinoCode as string

        try {
            await this.connectionsRepository.createConnection(macAddress, arduinoCode)

            return res.status(200).json({
                result: null,
                message: `Success creating a new connection between ${macAddress} and ${arduinoCode}`,
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
        const macAddress = req.body.macAddress as string
        const arduinoCode = req.body.arduinoCode as string

        console.log(macAddress, arduinoCode)

        try {
            await this.connectionsRepository.removeConnection(macAddress, arduinoCode)

            return res.status(200).json({
                result: null,
                message: `Success deleting the connection between ${macAddress} and ${arduinoCode}`
            })
        } catch(error: any) {
            if (error instanceof ConnectionDoesNotExistsException) {
                return res.status(400).json({
                    result: null,
                    message: `The is no connection between ${macAddress} and ${arduinoCode}`,
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
    @Get('check/:macAddress')
    async verifyIfConnectionExists(req: Request, res: Response): Promise<Response<any>|void> {
        const macAddress = req.params.macAddress as string

        try {
            const connectionExists = await this.connectionsRepository.exists(macAddress)
            const message = connectionExists
                ? `A connection for ${macAddress} exists`
                : `The is no connection for ${macAddress}`

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