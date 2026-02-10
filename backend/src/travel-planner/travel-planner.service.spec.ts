import { Test, TestingModule } from '@nestjs/testing';
import { TravelPlannerService } from './travel-planner.service';

describe('TravelPlannerService', () => {
  let service: TravelPlannerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelPlannerService],
    }).compile();

    service = module.get<TravelPlannerService>(TravelPlannerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
