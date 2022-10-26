// Importações da biblioteca de conexão com o banco de dados
import { Client } from "pg"
import { IConnector } from "./IConnector"

/**
 * Classe responsável por lidar com a conexão com o banco de dados Postgreslq
*/
export class PostgresqlDatabase implements IConnector {
    private config: DatabaseConfig

    constructor(config: DatabaseConfig) {
        this.config = config
    }

    /**
     * Conecta ao banco de dados e retorna um client
    */
    connect(): Client {
        const client = new Client(this.config)

        client.connect()

        return client
    }
}
