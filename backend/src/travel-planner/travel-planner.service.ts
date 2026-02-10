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

  async buildPlanner({
    city,
    stationId,
    startDate,
    endDate,
  }: {
    city: string;
    stationId: string;
    startDate: string;
    endDate: string;
  }) {
    // 1️⃣ Busca dados climáticos reais (GENÉRICO)
    const weatherData = await this.weatherService.getWeatherByPeriod({
      stationId,
      startDate,
      endDate,
    });

    // 2️⃣ Cálculos básicos
    const avgTemp =
      weatherData.reduce((sum, day) => sum + day.tavg, 0) /
      weatherData.length;

    const rainyDays = weatherData.filter(
      (day) => day.prcp && day.prcp > 0,
    ).length;

    // 3️⃣ Classificação de risco climático
    let climateRisk = 'baixo';
    if (rainyDays >= 3) climateRisk = 'alto';
    else if (rainyDays > 0) climateRisk = 'médio';

    // 4️⃣ Montagem dos dias com sugestões
    const days = weatherData.map((day) => ({
      data: day.date,
      clima: day.prcp && day.prcp > 0 ? 'instável' : 'bom',
      sugestoes:
        climateRisk === 'baixo'
          ? this.placesService.getOutdoorPlaces()
          : this.placesService.getIndoorPlaces(),
    }));

    // 5️⃣ Trem turístico (regra simples por enquanto)
    const train = this.trainService.checkJuneTrainAvailability();

    // 6️⃣ Resposta final do planner
    return {
      cidade: city,
      periodo: `${startDate} → ${endDate}`,
      temperatura_media: `${avgTemp.toFixed(1)}°C`,
      dias_com_chuva: rainyDays,
      risco_climatico: climateRisk,
      trem_turistico: train,
      dias: days,
    };
  }
}
