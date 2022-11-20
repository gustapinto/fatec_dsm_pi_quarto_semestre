/**
 * Exceção usada quando uma conexão entre dispositivo mobile e o arduino não existe
 * na tabela de conexões
*/
export class ConnectionDoesNotExistsException extends Error {
    constructor(macAddress: string, arduinoCode: string|number) {
        super()

        this.name = 'ConnectionDoesNotExistsException'
        this.message = `The connection between ${macAddress} and ${arduinoCode} does not exists in database`
    }
}