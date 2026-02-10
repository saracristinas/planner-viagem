import { Module } from '@nestjs/common';
import { TravelPlannerController } from './travel-planner.controller';
import { TravelPlannerService } from './travel-planner.service';
import { WeatherModule } from '../weather/weather.module';
import { TrainModule } from '../train/train.module';
import { PlacesModule } from '../places/places.module';

@Module({
  imports: [WeatherModule, TrainModule, PlacesModule],
  controllers: [TravelPlannerController],
  providers: [TravelPlannerService],
})
export class TravelPlannerModule {}
