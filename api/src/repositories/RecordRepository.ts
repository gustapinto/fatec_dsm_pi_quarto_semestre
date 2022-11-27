import { Repository } from "./Repository";

/**
 * Classe responsável por lidar com as conexões com banco de dados para as queries
 * de registros de temperatura
*/
export class RecordRepository extends Repository {
    /**
     * Obtém os registros de temperatura para os códigos de arduino passados
    */
    async getRecordsWithArduinoCodes(codes: Array<number>, startDate?: Date, limit?: number): Promise<Array<any>> {
        let queryString = `
            SELECT *, TO_CHAR(created_at, 'dd/mm/yy\n hh:mi') as "date"
            FROM records
            WHERE arduino_code = ANY($1)
        `
        let params: Array<Array<number>|number|Date> = [codes]

        if (startDate) {
            queryString += ' AND created_at >= $2'
            params.push(startDate)
        }

        // Sempre vai ordenar a listagem pelos registros mais novos,
        // independente de quais filtros são passados
        queryString += ' ORDER BY created_at DESC'

        if (limit) {
            const limitPosition = startDate ? '$3' : '$2'

            queryString += ` LIMIT ${limitPosition}`
            params.push(limit)
        }

        return await this.query(queryString, params)
    }

    /**
     * Obtém os registros de temperatura para os códigos de arduino passado
     * limitando a data de criação dos registros para só obter os registros criados
     * depois da data passada
    */
    async getRecordsWithArduinoCodesAndStartDate(codes: Array<number>, startDate: Date): Promise<Array<any>> {
        return await this.getRecordsWithArduinoCodes(codes, startDate)
    }

    /**
     * Adiciona um novo registro no banco de dados
    */
    async createRecord(temperature: number, humidity: number, apiTemperature: number, arduinoCode: number): Promise<void> {
        const now = new Date()
        const queryString = `
            INSERT INTO records (temperature, humidity, api_temperature, arduino_code, created_at)
            VALUES ($1, $2, $3, $4, $5)
        `

        await this.query(queryString, [
            temperature,
            humidity,
            apiTemperature,
            arduinoCode,
            now
        ])
    }

    /**
     * Remove os registros do banco de dados a partir do código de arduino que
     * os criou
    */
    async deleteRecordWithArduinoCode(arduinoCode: string | number): Promise<void> {
        const queryString = `DELETE FROM records WHERE arduino_code = $1`

        await this.query(queryString, [arduinoCode])
    }

    /**
     * Obtém o último registro criado
     */
    async getLastRecord(arduinoCodes: Array<number>): Promise<object|null> {
        const result = await this.getRecordsWithArduinoCodes(arduinoCodes, undefined, 1)

        return result ? result[0] : null
    }
}