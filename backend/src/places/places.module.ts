import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';

@Module({
  providers: [PlacesService],
  exports: [PlacesService] // exporta o serviço para ser usado em outros módulos
})
export class PlacesModule {}
