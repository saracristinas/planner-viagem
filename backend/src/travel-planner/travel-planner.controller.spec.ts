import { Test, TestingModule } from '@nestjs/testing';
import { TravelPlannerController } from './travel-planner.controller';

describe('TravelPlannerController', () => {
  let controller: TravelPlannerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelPlannerController],
    }).compile();

    controller = module.get<TravelPlannerController>(TravelPlannerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
