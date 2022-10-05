// Importações da biblioteca de servidor
import { Controller, Get, Post } from "@overnightjs/core"
import { Request, Response } from "express"
// Importações da biblioteca de conexão com o banco de dados
import { Client, QueryResult } from "pg"

/**
 * Controller responsável por criar, apagar e obter registros de temperatura
 * e umidade
*/
@Controller('api/record')
export class RecordController {
    private client: Client

    constructor(client: Client) {
        this.client = client
    }

    /**
     * Retorna um JSON com todos os registros salvos no banco de dados
     * para os arduinos passados
    */
    @Get('/')
    getRecords(req: Request, res: Response): Response<any> {
        let records: Array<any> = []

        const params = req.query
        const arduinos = params.arduinos as Array<string>

        console.info(arduinos);

        (async() => {
            try {
                const queryString = `
                    SELECT *
                    FROM records
                    WHERE arduino_code IN $1
                `

                records = (await this.client.query(queryString, [[...arduinos]])).rows
            } catch(error: any) {
                console.error(error)

                return res.status(500).json({
                    message: error
                })
            }
        })()

        return res.status(200).json({
            result: records
        })
    }

    /**
     * Cria um novo registro a partir dos dados enviados na requisição
    */
    @Post()
    createRecord(req: Request, res: Response): Response<any> {
        const body = req.body
        const temperature = body.temperature as number
        const humidity= body.humidity as number
        const arduinoCode = body.arduinoCode as number
        const now = new Date() as Date

        (async () => {
            await this.client.connect()

            try {
                const queryString = `
                    INSERT INTO records (temperature, humidity, arduino_code, created_at)
                    VALUES ($1, $2, $3, $4)
                `

                await this.client.query(queryString, [temperature, humidity, arduinoCode, now])
            } catch(error: any) {
                console.error(error)

                return res.status(500).json({
                    message: error
                })
            } finally {
                await this.client.end()
            }
        })()

        return res.status(200).json({
            message: 'Success creating a new record'
        })
    }
}
