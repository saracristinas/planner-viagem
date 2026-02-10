import { Injectable } from '@nestjs/common';
import { WeatherService } from '../weather/weather.service';
import { TrainService } from '../train/train.service';
import { PlacesService } from '../places/places.service';

@Injectable()
export class TravelPlannerService {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly trainService: TrainService,
    private readonly placesService: PlacesService,
  ) {}

  async buildPlanner() {
    const climate = await this.weatherService.getCuritibaJuneWeatherReal();
    const train = this.trainService.checkJuneTrainAvailability();

    const days = [
      '2024-06-13',
      '2024-06-14',
      '2024-06-15',
      '2024-06-16',
      '2024-06-17',
      '2024-06-18',
    ];

    const goodWeather = climate.risco_climatico === 'baixo';

    const plannerDays = days.map((date) => ({
      data: date,
      clima: goodWeather ? 'bom' : 'instável',
      sugestoes: goodWeather
        ? this.placesService.getOutdoorPlaces()
        : this.placesService.getIndoorPlaces(),
    }));

    return {
      cidade: 'Curitiba',
      periodo: '13–18 de junho',
      clima: climate,
      trem_turistico: train,
      dias: plannerDays,
    };
  }
}
