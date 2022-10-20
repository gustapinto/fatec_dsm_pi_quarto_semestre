import { Repository } from "./Repository";

/**
 * Classe rsponsável por lidar com as conexões com banco de dados para as queries
 * de registros de temperatura
*/
export class RecordRepository extends Repository {
    async getRecordsFromArduinoCodes(codes: Array<number>): Promise<Array<any>> {
        const queryString = `
            SELECT * FROM records
            WHERE arduino_code = ANY($1)
        `;

        return await this.query(queryString, codes)
    }
}