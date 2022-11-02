import { Repository } from "./Repository";

/**
 * Classe responsável por lidar com as conexões com banco de dados para as queries
 * de arduinos
*/
export class ArduinoRepository extends Repository {
    /**
     * Insere um novo Arduino no banco de dados
    */
    async createArduino(code: number, name: string): Promise<void> {
        const now = new Date()
        const queryString = `
            INSERT INTO arduinos (code, name, created_at)
            VALUES ($1, $2, $3)
        `

        await this.query(queryString, [code, name, now])
    }

    /**
     * Obtém todos os arduinos do banco de dados
    */
    async getAllArduinos(): Promise<Array<any>> {
        const queryString = 'SELECT * FROM arduinos'

        return await this.query(queryString, [])
    }

    /**
     * Verifica se o arduino existe no banco a partir de seu código
    */
    async exists(arduinoCode: string): Promise<boolean> {
        const queryString = `
            SELECT count(*)
            FROM arduinos
            WHERE code = $1
            LIMIT 1
        `
        const result = await this.query(queryString, [arduinoCode])

        return result[0].count != 0
    }
}