import { Injectable } from '@nestjs/common';

@Injectable()
export class TrainService {
  checkJuneTrainAvailability() {
    return {
      train: 'Serra Verde Express',
      route: 'Curitiba → Morretes',
      duration: 'aprox. 4h',
      operatesInJune: 'only weekends',
      recommendedDay: 'Saturday',
      weatherRisk: 'low',
      insight:
        'O trem turístico opera apenas aos finais de semana em junho. Com base no histórico climático, o sábado apresenta menor risco de chuva.',
      recommendation:
        'Reserve o passeio para o sábado e evite a sexta-feira devido a maior chance de instabilidade.',
    };
  }
}
