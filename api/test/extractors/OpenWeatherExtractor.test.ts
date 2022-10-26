import { Config } from "../../src/config"
import { OpenWeatherExtractor } from "../../src/extractors/OpenWeatherExtractor"

describe('Unit testing for Openweather extrctar', (): void => {
    it('Test getWeatherData must not return a empty object on a valid request to the default city', async (): Promise<void> => {
        const extractor = new OpenWeatherExtractor(Config.getOpenWheaterAppId())
        const data = await extractor.getWeatherData()

        expect(data).not.toStrictEqual({})
    })

    it('Test getWeatherData must not return a empty object on a valid request to other city', async (): Promise<void> => {
        const extractor = new OpenWeatherExtractor(Config.getOpenWheaterAppId())
        const data = await extractor.getWeatherData('-22.9064', '47.0616')

        expect(data).not.toStrictEqual({})
    })

    it('Test getWeatherData must return a empty object with a invalid app id', async (): Promise<void> => {
        const extractor = new OpenWeatherExtractor('123456789')
        const data = await extractor.getWeatherData()

        expect(data).toStrictEqual({})
    })
})