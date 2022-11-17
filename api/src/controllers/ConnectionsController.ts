import { ClassMiddleware, Controller, Delete, Get, Post } from "@overnightjs/core";
import { NONAME } from "dns";
import { Request, Response } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { ArduinoRepository } from "../repositories/ArduinoRepository";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

/**
 * Classe responsável pelas APIs de conexões entre arduinos e dispositivos
 * mobile
*/
@Controller('api/connections')
@ClassMiddleware([AuthMiddleware])
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
    @Delete(':macAddress')
    async removeConnection(req: Request, res: Response): Promise<Response<any>|void> {
        const macAddress = req.params.macAddress as string

        try {

        } catch(error: any) {

        }
    }
}