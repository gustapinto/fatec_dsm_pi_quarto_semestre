/**
 * Classe responsável por gerenciar as configurações do sistema
 */
export class Config {
    /**
     * Obtém a app id do Openweather a partir das variáveis de ambiente
    */
    static getOpenWheaterAppId(): string {
        const appId = process.env.OPENWEATHER_API_KEY

        return appId == undefined ? '' : appId
    }

    /**
     * Obtém o objeto com os parâmetros de conexão com o banco de dados
    */
    static getDatabaseConfig(): DatabaseConfig {
        const config = {
            user: process.env.POSTGRES_USER!,
            host: process.env.POSTGRES_HOST!,
            database: process.env.POSTGRES_DB!,
            password: process.env.POSTGRES_PASSWORD!,
            port: parseInt(process.env.POSTGRES_PORT!)
        }

        return config
    }

    /**
     * Obtém o secret para assinatura de tokens JWT
    */
    static getJwtSecret(): string {
        return process.env.JWT_SECRET!
    }
}
