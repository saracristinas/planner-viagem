import { Controller, Get, Query } from '@nestjs/common';
import { TravelPlannerService } from './travel-planner.service';

@Controller('planner')
export class TravelPlannerController {
  constructor(private readonly plannerService: TravelPlannerService) {}

  @Get()
  getPlanner(
    @Query('city') city: string,
    @Query('stationId') stationId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.plannerService.buildPlanner({
      city,
      stationId,
      startDate,
      endDate,
    });
  }
}
