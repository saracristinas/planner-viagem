import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {
  getCuritibaJuneWeather() {
    return {
      city: 'Curitiba',
      month: 'June',
      averageTemperature: '10°C - 18°C',
      rainProbability: '30% - 40%',
      insight:
        'Junho em Curitiba costuma ser frio e relativamente seco, com menor volume de chuvas em comparação a outros meses.',
    };
  }

  getCuritibaJunePeriodWeather() {
  return {
    city: 'Curitiba',
    period: 'June 13–18',
    averageTemperature: '9°C - 17°C',
    rainyDaysEstimate: 2,
    rainRiskLevel: 'low-to-moderate',
    insight:
      'Historicamente, o período entre 13 e 18 de junho apresenta poucos dias de chuva, sendo considerado um bom intervalo para passeios ao ar livre.',
    recommendation:
      'Ideal para atividades externas como o trem turístico, especialmente no sábado.',
  };
}

}
