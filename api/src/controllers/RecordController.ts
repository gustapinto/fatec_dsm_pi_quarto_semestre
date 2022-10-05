// Importações da biblioteca de servidor
import { Controller, Get, Post } from "@overnightjs/core"
import { Request, Response } from "express"
// Importações da biblioteca de conexão com o banco de dados
import { Client, QueryResult } from "pg"
import { PostgresqlDatabase } from "../database/PostgresqlDatabase"

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
    getRecords(req: Request, res: Response): Response<any>|void {
        const params = req.query
        const arduinosQuery = params.arduinos;
        const codes: Array<number> = (arduinosQuery instanceof String)
            ? [parseInt(arduinosQuery as string)]
            : (arduinosQuery as Array<string>).map((code) => parseInt(code));

        const queryString = `
            SELECT *
            FROM records
            WHERE arduino_code = ANY($1)
        ` as string

        (async () => {
            try {
                const result = await this.client.query(queryString, [codes])

                return res.status(200).json({
                    result: result.rows
                })
            } catch(error: any) {
                console.error(error)

                return res.status(500).json({
                    message: error
                })
            }
        })()
    }

    /**
     * Cria um novo registro a partir dos dados enviados na requisição
    */
    @Post()
    createRecord(req: Request, res: Response): Response<any>|void {
        const body = req.body
        const temperature = body.temperature as number
        const humidity= body.humidity as number
        const arduinoCode = body.arduinoCode as number
        const now = new Date() as Date

        const queryString = `
            INSERT INTO records (temperature, humidity, arduino_code, created_at)
            VALUES ($1, $2, $3, $4)
        ` as string

        (async () => {
            try {
                await this.client.query(queryString, [temperature, humidity, arduinoCode, now])

                return res.status(200).json({
                    message: 'Success creating a new record'
                })
            } catch(error: any) {
                console.error(error)

                return res.status(500).json({
                    message: error
                })
            }
        })()
    }
}
