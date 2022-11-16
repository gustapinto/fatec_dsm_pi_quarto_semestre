import { Config } from "./src/config";
import { PostgresqlDatabase } from "./src/database/PostgresqlDatabase";

/**
 * Script que realiza a migração do banco de dados, criando as tabelas necessárias
*/
(async () => {
    const client = (new PostgresqlDatabase(Config.getDatabaseConfig())).connect()

    const resetQueryString = `
        DROP TABLE IF EXISTS records;

        DROP TABLE IF EXISTS arduinos;

        DROP TABLE IF EXISTS connections;
    `

    const migrationsQueryString = `
        CREATE TABLE IF NOT EXISTS arduinos (
            id SERIAL PRIMARY KEY,
            code INT UNIQUE NOT NULL,
            name VARCHAR(100) NOT NULL,
            created_at TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS records (
            id SERIAL PRIMARY KEY,
            temperature DECIMAL(2) NOT NULL,
            humidity DECIMAL(2) NOT NULL,
            api_temperature DECIMAL(2) NOT NULL,
            arduino_code INT NOT NULL REFERENCES arduinos (code),
            created_at TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS connections (
            id SERIAL PRIMARY KEY,
            arduino_code INT UNIQUE NOT NULL REFERENCES arduinos (code),
            mac_address MACADDR NOT NULL,
            created_at TIMESTAMP NOT NULL
        );
    `

    try {
        if (process.argv.length >= 3) {
            if (process.argv[2] == 'reset') {
                await client.query(resetQueryString)
            }
        }

        await client.query(migrationsQueryString)
    } catch(error: any) {
        console.error(error)
    } finally {
        client.end()
    }
})()
