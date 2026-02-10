import { Controller, Get } from '@nestjs/common';
import { TravelPlannerService } from './travel-planner.service';

@Controller('planner')
export class TravelPlannerController {
  constructor(private readonly plannerService: TravelPlannerService) {}

  @Get('curitiba/junho')
  getPlanner() {
    return this.plannerService.buildPlanner();
  }
}
