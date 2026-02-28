import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common'
import { TripService } from './trip.service'
import { CreateTripDto } from './dto/create-trip.dto'

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) { }

  @Post()
  create(@Body() body: CreateTripDto) {
    return this.tripService.create(body)
  }

  @Get(':id/resumo')
  getResumo(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.getResumo(id)
  }

  @Get()
  findAll() {
    return this.tripService.findAll()
  }

  @Post(':id/usaremergencia')
  usarEmergencia(@Param('id', ParseIntPipe) id: number) {
    return this.tripService.usarEmergencia(id)
  }

}