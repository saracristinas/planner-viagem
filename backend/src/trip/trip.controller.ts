import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { AuthUser } from 'src/auth/types/auth-user.type';

@UseGuards(JwtAuthGuard)
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  create(@Body() body: CreateTripDto, @CurrentUser() user: AuthUser) {
    return this.tripService.create(body, user.id);
  }

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.tripService.findAll(user.id);
  }

  @Get(':id/resumo')
  getResumo(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.tripService.getResumo(id, user.id);
  }

  @Post(':id/usaremergencia')
  usarEmergencia(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.tripService.usarEmergencia(id, user.id);
  }
}