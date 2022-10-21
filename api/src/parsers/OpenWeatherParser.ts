/**
 * Classe que realiza o parseamento dos dados da Api OpenWeather
*/
export class OpenWeatherParser {
    /**
     * Obtém a temperatura a partir do JSON de retorno do Openweather
    */
    public getTemperature(data: any): number {
        return Object.keys(data).length == 0 ? 0 : data.main.temp
    }
}