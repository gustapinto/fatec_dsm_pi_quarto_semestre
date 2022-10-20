// Importações da biblioteca de servidor
import { Controller, Get, Post } from "@overnightjs/core"
import { Request, Response } from "express"
// Importações da biblioteca de conexão com o banco de dados
import { Client } from "pg"

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
    createArduino(req: Request, res: Response): Response<any>|void {
        // Pegando os dados do corpo da requisição
        const body = req.body
        const code = body.code as number
        const name = body.name as string
        const now = new Date() as Date

        const queryString = `
            INSERT INTO arduinos (code, name, created_at)
            VALUES ($1, $2, $3)
        ` as string

        // Usa uma função async para poder usar await
        (async () => {
            try {
                // Criando um novo arduino no banco de dados
                await this.client.query(queryString, [code, name, now])

                return res.status(200).json({
                    message: 'Success creating a new arduino'
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
     * Obtém as placas salvas no banco de daos
    */
    @Get()
    getArduino(_: Request, res: Response): Response<any>|void {
        const queryString = 'SELECT * FROM arduinos' as string

        (async () => {
            try {
                const result = await this.client.query(queryString)

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
}
