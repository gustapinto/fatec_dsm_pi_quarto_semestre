import { PostgresqlDatabase } from "./src/database/PostgresqlDatabase";

(async () => {
    const client = PostgresqlDatabase.connect()

    const migrationsQueryString = `
        CREATE TABLE IF NOT EXISTS arduinos (
            id SERIAL PRIMARY KEY,
            code INT UNIQUE NOT NULL,
            created_at TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS records (
            id SERIAL PRIMARY KEY,
            temperature DECIMAL(2) NOT NULL,
            humidity DECIMAL(2) NOT NULL,
            arduino_code INT NOT NULL REFERENCES arduinos (code),
            created_at TIMESTAMP
        );
    `

    try {
        await client.query(migrationsQueryString)
    } catch(error: any) {
        console.error(error)
    } finally {
        client.end()
    }
})()