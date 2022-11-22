// Importações da biblioteca de servidor
import { ClassMiddleware, Controller, Get, Post } from "@overnightjs/core"
import { Request, Response } from "express"
// Importações de biblioteca de conexão com a API
import { IWeatherExtractor } from "../extractors/IWeatherExtractor"
import AuthMiddleware from "../middlewares/AuthMiddleware"
import { IWeatherParser } from "../parsers/IWeatherParser"
import { RecordRepository } from "../repositories/RecordRepository"

/**
 * Controller responsável por criar, apagar e obter registros de temperatura
 * e umidade
*/
@Controller('api/record')
@ClassMiddleware([AuthMiddleware])
export class RecordController {
    private extractor: IWeatherExtractor
    private parser: IWeatherParser
    private repository: RecordRepository

    constructor(extractor: IWeatherExtractor, parser: IWeatherParser, repository: RecordRepository) {
        this.extractor = extractor
        this.parser = parser
        this.repository = repository
    }

    /**
     * Retorna um JSON com todos os registros salvos no banco de dados
     * para os arduinos passados
    */
    @Get('/')
    async getRecords(req: Request, res: Response): Promise<Response<any>|void> {
        const codes = this.getArduinoCodesFromParams(req.query.arduinos as Array<string> | string);
        const limit = req.query.limit as number | undefined

        console.log(limit)

        try {
            const records = await this.repository.getRecordsWithArduinoCodes(codes, undefined, limit)

            return res.status(200).json({
                result: records,
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
     * Cria um novo registro a partir dos dados enviados na requisição
    */
    @Post()
    async createRecord(req: Request, res: Response): Promise<Response<any>|void> {
        const body = req.body
        const temperature = body.temperature as number
        const humidity= body.humidity as number
        const arduinoCode = body.arduinoCode as number

        try {
            const weatherData = await this.extractor.getWeatherData()
            const apiTemperature = this.parser.getTemperature(weatherData)

            await this.repository.createRecord(temperature, humidity, apiTemperature, arduinoCode)

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
     * Obtém os registros de temperatura salvos nos últimos minutos
    */
    @Get('recent')
    async getRecentRecords(req: Request, res: Response): Promise<Response<any>|void> {
        const minutes = (req.query.minutes) ? req.query.minutes : '5'
        const codes = this.getArduinoCodesFromParams(req.query.arduinos as Array<string> | string)
        const startDate = this.getStartDate(parseInt(minutes as string))

        try {
            const records = await this.repository.getRecordsWithArduinoCodesAndStartDate(codes, startDate)

            return res.status(200).json({
                result: records,
                message: '',
            })
        } catch(error: any) {
            return res.status(500).json({
                result: null,
                message: error.message
            })
        }
    }

    /**
     * Obtém o último registro criado pelos rduinos passados
    */
    @Get('last')
    async getLastRecord(req: Request, res: Response): Promise<Response<any>|void> {
        const arduinos = this.getArduinoCodesFromParams(req.query.arduinos as Array<string> | string)

        try {
            const result = await this.repository.getLastRecord(arduinos)

            console.log(result)

            if (!result) {
                return res.status(404).json({
                    result: null,
                    message: 'There is no record'
                })
            }

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
    private getStartDate(minutes: number): Date {
        const date = new Date() as Date

        date.setMinutes(date.getMinutes() - minutes)

        return date
    }
}
