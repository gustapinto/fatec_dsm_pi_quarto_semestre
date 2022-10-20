// Importações da biblioteca de servidor
import * as bodyParser from "body-parser"
import { Server } from "@overnightjs/core"
// Importa as nossas classes
import { ArduinoController } from "./controllers/ArduinoController"
import { PostgresqlDatabase } from "./database/PostgresqlDatabase"
import { RecordController } from "./controllers/RecordController"
import { OpenWeatherExtractor } from "./extractors/OpenWeatherExtractor"
import { OpenWeatherParser } from "./parsers/OpenWeatherParser"

/**
 * Declarando a classe que funcionará como servidor
*/
export class ApiServer extends Server {
    constructor() {
        super()

        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}))

        this.setupControllers()
    }

    /**
     * Inicia o servidor na porta passada como argumento
    */
    start(port: number): void {
        this.app.listen(port, () => {
            console.log('Servidor funcionando na porta: ' + port)
        })
    }

    /**
     * Registra os controllers
    */
    private setupControllers(): void {
        const client = (new PostgresqlDatabase()).connect()

        const extractor = new OpenWeatherExtractor(process.env.OPENWEATHER_API_KEY as string)
        const parser = new OpenWeatherParser()

        const arduinoController = new ArduinoController(client)
        const recordController = new RecordController(client, extractor, parser)

        // Registrando os controller no overnightjs
        super.addControllers([
            arduinoController,
            recordController,
        ])
    }
}
