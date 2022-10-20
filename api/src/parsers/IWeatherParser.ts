/**
 * Interface padrão para parsers de dados climáticos
*/
export interface IWeatherParser {
    getTemperature(data: any): Number
}