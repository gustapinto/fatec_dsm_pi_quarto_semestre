import { ArduinoDoesNotExistsException } from "../exceptions/ArduinoDoesNotExistsException";
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
    async exists(arduinoCode: string | number): Promise<boolean> {
        const queryString = `
            SELECT *
            FROM arduinos
            WHERE code = $1
        `
        const result = await this.query(queryString, [arduinoCode])

        return result.length > 0
    }

    /**
     * Atualiza um arduinos já existente no banco de dados
    */
    async updateArduino(oldCode: string | number, newCode: number, newName: string): Promise<void> {
        if (!await this.exists(oldCode)) {
            throw new ArduinoDoesNotExistsException()
        }

        const queryString = `
            UPDATE arduinos
            SET code = $1, name = $2
            WHERE code = $3
        `

        await this.query(queryString, [newCode, newName, oldCode])
    }

    /**
     * Apaga um arduino do banco de dados
    */
    async deleteArduino(arduinoCode: string | number): Promise<void> {
        if (!await this.exists(arduinoCode)) {
            throw new ArduinoDoesNotExistsException()
        }

        const queryString = `DELETE FROM arduinos WHERE code = $1`

        await this.query(queryString, [arduinoCode])
    }
}