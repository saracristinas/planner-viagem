import { Controller, Get } from '@nestjs/common';
import { TrainService } from './train.service';

@Controller('train')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Get('serra-verde/june/13-18')
  checkTrainAvailability() {
    return this.trainService.checkJuneTrainAvailability();
  }
}
