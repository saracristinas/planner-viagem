import { TravelPlannerModule } from './travel-planner/travel-planner.module';
import { PlacesModule } from './places/places.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { TrainModule } from './train/train.module';
import { PrismaModule } from './prisma/prisma.module';
import { TripModule } from './trip/trip.module';
import { ExpenseModule } from './expense/expense.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WeatherModule,
    TrainModule,
    PlacesModule,
    TravelPlannerModule,
    PrismaModule,
    TripModule,
    ExpenseModule,
    AuthModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
