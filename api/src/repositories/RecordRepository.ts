import { Repository } from "./Repository";

/**
 * Classe responsável por lidar com as conexões com banco de dados para as queries
 * de registros de temperatura
*/
export class RecordRepository extends Repository {
    /**
     * Obtém os registros de temperatura para os códigos de arduino passados
    */
    async getRecordsWithArduinoCodes(codes: Array<number>): Promise<Array<any>> {
        const queryString = `
            SELECT * FROM records
            WHERE arduino_code = ANY($1)
        `;

        return await this.query(queryString, [codes])   
    }

    /**
     * Obtém os registros de temperatura para os códigos de arduino passado
     * limitando a data de criação dos registros para só obter os registros criados
     * depois da data passada
    */
    async getRecordsWithArduinoCodesAndStartDate(codes: Array<number>, startDate: Date): Promise<Array<any>> {
        const queryString = `
            SELECT * FROM records
            WHERE arduino_code = ANY($1)
            AND created_at >= $2
        `;

        return await this.query(queryString, [codes, startDate])
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
}