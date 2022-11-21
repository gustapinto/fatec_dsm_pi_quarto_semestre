import { ConnectionDoesNotExistsException } from "../exceptions/ConnectionDoesNotExistsException"
import { Repository } from "./Repository"

/**
 * Classe responsável por lidar com as conexões de bancos de dados para as
 * queries de conexões entre arduinos e dispositivos mobile
*/
export class ConnectionsRepository extends Repository {
    /**
     * Cria uma nova conexão entre o dispositivo mobile e o arduino
    */
    async createConnection(androidId: string, arduinoCode: number|string): Promise<void> {
        const now = new Date()
        const queryString = `
            INSERT INTO connections (arduino_code, android_id, created_at)
            VALUES ($1, $2, $3)
        `

        await this.query(queryString, [arduinoCode, androidId, now])
    }

    /**
     * Obtém todos os arduinos conectados em um dispositivo mobile
    */
    async getArduinosByConnectionAndroidId(androidId: string): Promise<Array<any>> {
        const queryString = `
            SELECT a.code AS "arduinoCode",
                a.name AS "arduinoName",
                c.android_id AS "androidId"
            FROM connections c
            JOIN arduinos a ON a.code = c.arduino_code
            WHERE c.android_id = $1
        `

        return await this.query(queryString, [androidId])
    }

    /**
     * Verifica se um mac address existe na tabela de conexões
    */
    async exists(androidId: string, arduinoCode?: number|string): Promise<boolean> {
        let queryString = `SELECT * FROM connections WHERE android_id = $1`
        let params: Array<string|number> = [androidId]

        if (typeof arduinoCode != 'undefined') {
            queryString += ' AND arduino_code = $2'

            params.push(arduinoCode)
        }

        const result = await this.query(queryString, params)

        return result.length > 0
    }

    /**
     * Deleta uma conexão do banco de dados a partir do mac address e do código
     * de arduino fornecido
    */
    async removeConnection(androidId: string, arduinoCode: number|string): Promise<void> {
        if (!await this.exists(androidId, arduinoCode)) {
            throw new ConnectionDoesNotExistsException(androidId, arduinoCode)
        }

        const queryString = `
            DELETE FROM connections
            WHERE android_id = $1
            AND arduino_code = $2
        `

        await this.query(queryString, [androidId, arduinoCode])
    }
}