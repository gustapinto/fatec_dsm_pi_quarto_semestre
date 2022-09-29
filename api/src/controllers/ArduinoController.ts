// Importações da biblioteca de servidor
import { Controller, Post } from "@overnightjs/core"
import { Request, Response } from "express"
// Importações da biblioteca de conexão com o banco de dados
import { Client } from "pg"
import { resourceLimits } from "worker_threads"

/**
 * Controller responsável por criar e apagar registros das placas arduino
*/
@Controller('api/arduino')
export class ArduinoController {
    // Declarando propriedade do cliente de banco de dados
    private client: Client

    constructor(client: Client) {
        // Injetando o client banco de dados
        this.client = client
    }

    /**
     * Salva dados no banco de dados
    */
    @Post()
    createArduino(req: Request, res: Response): Response<any> {
        // Pegando os dados do corpo da requisição
        const body = req.body
        const code = body.code as number // ódio, apenas

        // Usa uma função async para poder usar await
        (async () => {
            try {
                // Criando um novo arduino no banco de dados
                await this.client.query('INSERT INTO arduinos (code) VALUES ($1)', [code])
            } catch(error: any) {
                return res.status(500).json({
                    message: error.stack
                })
            }
        })()

        return res.status(200).json({})
    }
}
