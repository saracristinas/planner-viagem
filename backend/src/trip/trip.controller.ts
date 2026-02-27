import { Controller, Post, Body, Get } from '@nestjs/common'
import { TripService } from './trip.service'
import { CreateTripDto } from './dto/create-trip.dto'

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  create(@Body() body: CreateTripDto) {
    return this.tripService.create(body)
  }

  @Get()
  findAll() {
    return this.tripService.findAll()
  }
}