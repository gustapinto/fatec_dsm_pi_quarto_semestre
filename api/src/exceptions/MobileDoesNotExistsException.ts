/**
 * Exceção usada quando um dispositivo mobile não existe na tabela de conexões
*/
export class MobileDoesNotExistsException extends Error {
    constructor() {
        super()

        this.name = 'MobileDoesNotExistsException'
        this.message = 'The informed mobile macAddress does not exists in database'
    }
}