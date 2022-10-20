// Importações da biblioteca de conexão com o banco de dados
import { Client } from "pg"
import { IConnector } from "./IConnector"

/**
 * Classe responsável por lidar com a conexão com o banco de dados Postgreslq
*/
export class PostgresqlDatabase implements IConnector {
    /**
     * Conecta ao banco de dados e retorna um client
    */
    connect(): Client {
        const client = new Client({
            user: 'pi_dsm4',
            host: 'postgres',
            database: 'pi_dsm4',
            password: 'pi_dsm4',
            port: 5432,
        })

        client.connect()

        return client
    }
}
