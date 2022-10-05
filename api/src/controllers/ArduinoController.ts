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
        const code = body.code as number
        const now = new Date() as Date

        // Usa uma função async para poder usar await
        (async () => {
            try {
                const queryString = `
                    INSERT INTO arduinos (code, created_at)
                    VALUES ($1, $2)
                `

                // Criando um novo arduino no banco de dados
                await this.client.query(queryString, [code, now])
            } catch(error: any) {
                console.error(error)

                return res.status(500).json({
                    message: error
                })
            }
        })()

        return res.status(200).json({
            message: 'Success creating a new arduino'
        })
    }
}
