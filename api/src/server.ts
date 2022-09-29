// Importações da biblioteca de servidor
import * as bodyParser from "body-parser"
import { Server } from "@overnightjs/core"
// Importa as nossas classes
import { ArduinoController } from "./controllers/ArduinoController"
import { PostgresqlDatabase } from "./database/PostgresqlDatabase"

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
        const database = new PostgresqlDatabase()
        const client = database.connect()

        const arduinoController = new ArduinoController(client)

        // Registrando os controller no overnightjs
        super.addControllers([
            arduinoController
        ])
    }
}
