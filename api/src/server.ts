// Importações da biblioteca de servidor
import * as bodyParser from "body-parser"
import { Server } from "@overnightjs/core"
// Importa as nossas classes
import { ArduinoController } from "./controllers/ArduinoController"
import { PostgresqlDatabase } from "./database/PostgresqlDatabase"
import { RecordController } from "./controllers/RecordController"
import { OpenWeatherExtractor } from "./extractors/OpenWeatherExtractor"
import { OpenWeatherParser } from "./parsers/OpenWeatherParser"
import { RecordRepository } from "./repositories/RecordRepository"
import { ArduinoRepository } from "./repositories/ArduinoRepository"
import { Config } from "./config"
import { AuthController } from "./controllers/AuthController"
import { ConnectionsController } from "./controllers/ConnectionsController"
import { ConnectionsRepository } from "./repositories/ConnectionsRepository"

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
        const dbConnector = new PostgresqlDatabase(Config.getDatabaseConfig())
        const client = dbConnector.connect()

        const extractor = new OpenWeatherExtractor(Config.getOpenWheaterAppId())
        const parser = new OpenWeatherParser()
        const recordRepository = new RecordRepository(client)
        const arduinoRepository = new ArduinoRepository(client)
        const connectionsRepository = new ConnectionsRepository(client)

        const arduinoController = new ArduinoController(arduinoRepository, recordRepository)
        const recordController = new RecordController(extractor, parser, recordRepository)
        const authController = new AuthController(arduinoRepository)
        const connectionsController = new ConnectionsController(arduinoRepository, connectionsRepository)

        // Registrando os controller no overnightjs
        super.addControllers([
            arduinoController,
            recordController,
            authController,
            connectionsController,
        ])
    }
}
