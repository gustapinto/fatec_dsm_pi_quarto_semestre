import { OpenWeatherParser } from "../../src/parsers/OpenWeatherParser"
import mockedValidTemperature from "../fixtures/mockedValidTemperature.json"

describe('Unit testing for Openweather prser', (): void => {
    it('Test getTemperature must return 0 on empty data', (): void => {
        const parser = new OpenWeatherParser()
        const temp = parser.getTemperature({})

        expect(temp).toStrictEqual(0)
    })

    it('Test getTemperature must get the temperature of a valid data', (): void => {
        const parser = new OpenWeatherParser()
        const temp = parser.getTemperature(mockedValidTemperature)

        expect(temp).toStrictEqual(18.93)
    })
})