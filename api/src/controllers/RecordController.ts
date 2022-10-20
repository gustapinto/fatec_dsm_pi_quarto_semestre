// Importações da biblioteca de servidor
import { Controller, Get, Post } from "@overnightjs/core"
import { Request, Response } from "express"
// Importações da biblioteca de conexão com o banco de dados
import { Client, types } from "pg"
// Importações de biblioteca de conexão com a API
import { IWeatherExtractor } from "../extractors/IWeatherExtractor"
import { IWeatherParser } from "../parsers/IWeatherParser"

/**
 * Controller responsável por criar, apagar e obter registros de temperatura
 * e umidade
*/
@Controller('api/record')
export class RecordController {
    private client: Client
    private extractor: IWeatherExtractor
    private parser: IWeatherParser

    constructor(client: Client, extractor: IWeatherExtractor, parser: IWeatherParser) {
        this.client = client
        this.extractor = extractor
        this.parser = parser
    }

    /**
     * Retorna um JSON com todos os registros salvos no banco de dados
     * para os arduinos passados
    */
    @Get('/')
    getRecords(req: Request, res: Response): Response<any>|void {
        const codes = this.getArduinoCodesFromParams(req.query.arduinos as Array<string> | string);
        const queryString = `
            SELECT * FROM records
            WHERE arduino_code = ANY($1)
        `;

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
        const weatherData = this.extractor.getWeatherData()
        const apiTemperature = this.parser.getTemperature(weatherData)

        const queryString = `
            INSERT INTO records (temperature, humidity, api_temperature, arduino_code, created_at)
            VALUES ($1, $2, $3, $4, $5)
        ` as string

        (async () => {
            try {
                await this.client.query(queryString, [
                    temperature,
                    humidity,
                    apiTemperature,
                    arduinoCode,
                    now
                ])

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

    /**
     * Obtém os registros de temperatura salvos nos últimos minutos
    */
    @Get('recent')
    getRecentRecords(req: Request, res: Response): Response<any>|void {
        const minutes = (req.query.minutes) ? req.query.minutes : '5'
        const codes = this.getArduinoCodesFromParams(req.query.arduinos as Array<string> | string)
        const recentDate = this.getNowMinusMinutes(parseInt(minutes as string))
        const queryString = `
            SELECT * FROM records
            WHERE arduino_code = ANY($1)
            AND created_at >= $2
        `;

        (async () => {
            try {
                // Configura o parser do pg-node para trabalhar com campos
                // Timestamp
                types.setTypeParser(types.builtins.TIMESTAMP, (stringValue) => {
                    return stringValue;
                });

                const result = await this.client.query(queryString, [codes, recentDate])

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
     * Obtendo os códigos dos arduinos passados como parâmetros, tratando casos
     * em que apenas um código é passado
    */
    private getArduinoCodesFromParams(params: Array<string> | string): Array<number> {
        return (typeof params === 'string')
            ? [parseInt(params as string)]
            : (params as Array<string>).map((code) => parseInt(code));
    }

    /**
     * Obtém uma data que representa (agora - N minutos)
    */
    private getNowMinusMinutes(minutes: number): Date {
        const date = new Date() as Date

        date.setMinutes(date.getMinutes() - minutes)

        return date
    }
}
