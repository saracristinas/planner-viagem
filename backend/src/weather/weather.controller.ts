import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) { }

    @Get('curitiba/june')
    getCuritibaJuneWeather() {
        return this.weatherService.getCuritibaJuneWeather();
    }

    @Get('curitiba/june/13-18')
    getCuritibaJunePeriodWeather() {
        return this.weatherService.getCuritibaJunePeriodWeather();
    }

    @Get('curitiba/june/real')
    getCuritibaJuneWeatherReal() {
        return this.weatherService.getCuritibaJuneWeatherReal();
    }


}
