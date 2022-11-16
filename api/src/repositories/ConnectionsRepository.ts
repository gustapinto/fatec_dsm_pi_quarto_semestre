import { Repository } from "./Repository"

/**
 * Classe responsável por lidar com as conexões de bancos de dados para as
 * queries de conexões entre arduinos e dispositivos mobile
*/
export class ConnectionsRepository extends Repository {
    /**
     * Cria uma nova conexão entre o dispositivo mobile e o arduino
    */
    async createConnection(macAddress: string, arduinoCode: number|string): Promise<void> {
        const now = new Date()
        const queryString = `
            INSERT INTO connections (arduino_code, mac_address, created_at)
            VALUES ($1, $2, $3)
        `

        await this.query(queryString, [arduinoCode, macAddress, now])
    }

    /**
     * Obtém todos os arduinos conectados em um dispositivo mobile
    */
    async getArduinosByConnectionMacAddress(macAddress: string): Promise<Array<any>> {
        const queryString = `
            SELECT a.code AS "arduinoCode",
                a.name AS "arduinoName",
                c.mac_address AS "macAddress"
            FROM connections c
            JOIN arduinos a ON a.code = c.arduino_code
            WHERE c.mac_address = $1
        `

        return await this.query(queryString, [macAddress])
    }
}