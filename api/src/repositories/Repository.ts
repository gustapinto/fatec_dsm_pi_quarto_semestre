import { Client, Query, QueryResult, types } from "pg";

/**
 * Classe rsponsável por lidar com as conexões com banco de dados
*/
export abstract class Repository {
    protected client: Client

    constructor(client: Client) {
        this.client = client
    }

    /**
     * Faz uma consulta no banco de dados passando a query string e os parâmetros,
     * retornando os resultados como array
     */
    protected async query(queryString: string, args: Array<any>): Promise<Array<any>> {
        let rows = [] as Array<any>

        try {
            // Configura o parser do pg-node para trabalhar com campos
            // Timestamp
            types.setTypeParser(types.builtins.TIMESTAMP, (stringValue: string) => {
                return stringValue;
            });

            let result: QueryResult

            if (args.length == 0) {
                result = await this.client.query(queryString)
            } else {
                result = await this.client.query(queryString, args)
            }

            rows = result.rows
        } catch(error: any) {
            console.error(error)
        }

        return rows
    }
}