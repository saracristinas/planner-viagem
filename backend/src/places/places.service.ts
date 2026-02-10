import { Injectable } from '@nestjs/common';

@Injectable()
export class PlacesService {
  getOutdoorPlaces() {
    return ['Jardim Botânico', 'Parque Tanguá', 'Ópera de Arame', 'Parque Barigui'];
  }

  getIndoorPlaces() {
    return ['Museu Oscar Niemeyer', 'Museu Paranaense', 'Shopping Mueller'];
  }
}
