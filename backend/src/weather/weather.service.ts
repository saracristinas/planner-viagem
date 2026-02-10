import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class WeatherService {
    constructor(private readonly httpService: HttpService) { }
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

    async getCuritibaJuneWeatherReal() {
        const stationId = '83842';

        const response = await firstValueFrom(
            this.httpService.get(
                'https://meteostat.p.rapidapi.com/stations/daily',
                {
                    params: {
                        station: stationId,
                        start: '2024-06-01',
                        end: '2024-06-30',
                    },
                    headers: {
                        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                        'x-rapidapi-host': 'meteostat.p.rapidapi.com',
                    },
                },
            ),
        );

        const juneData = response.data.data;

        const periodData = juneData.filter((day) => {
            const date = new Date(day.date).getDate();
            return date >= 13 && date <= 18;
        });

        // 👉 CÁLCULOS
        const avgTemp =
            periodData.reduce((sum, day) => sum + day.tavg, 0) /
            periodData.length;

        const rainyDays = periodData.filter(
            (day) => day.prcp && day.prcp > 0,
        ).length;

        // 👉 melhor dia = menos chuva + temperatura mais alta
        const bestDay = periodData.reduce((best, current) => {
            if (!best) return current;
            if ((current.prcp || 0) < (best.prcp || 0)) return current;
            if (current.tavg > best.tavg) return current;
            return best;
        }, null);

        // 👉 INSIGHT
        let climateRisk = 'baixo';
        if (rainyDays >= 3) climateRisk = 'alto';
        else if (rainyDays > 0) climateRisk = 'médio';

        const recommendation =
            climateRisk === 'baixo'
                ? 'Período ideal para passeios ao ar livre e trem turístico.'
                : climateRisk === 'médio'
                    ? 'Alguns dias com risco de chuva, planeje passeios internos como alternativa.'
                    : 'Alto risco de chuva, priorize atrações internas.';

        return {
            cidade: 'Curitiba',
            período: '13–18 de junho',
            temperatura_media: `${avgTemp.toFixed(1)}°C`,
            dias_com_chuva: rainyDays,
            risco_climatico: climateRisk,
            melhor_dia_externo: bestDay
                ? `${new Date(bestDay.date).toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: '2-digit',
                    month: '2-digit',
                })}`
                : null,
            recomendação: recommendation,
        };
    }

}