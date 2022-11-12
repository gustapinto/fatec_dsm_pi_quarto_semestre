/**
 * Exceção usada quando um Arduino não existe no banco de dados, por exemplo
 * em uma operação de update ou delete
*/
export class ArduinoDoesNotExistsException extends Error {
    constructor() {
        super()

        this.name = 'ArduinoDoesNotExistsException'
        this.message = 'The informed arduino does not exists in database'
    }
}