import { TravelPlannerModule } from './travel-planner/travel-planner.module';
import { PlacesModule } from './places/places.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { TrainModule } from './train/train.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WeatherModule,
    TrainModule,
    PlacesModule,
    TravelPlannerModule, // ISSO AQUI É O QUE FALTAVA
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
