import { Test, TestingModule } from '@nestjs/testing';
import { EndpointAccessesController } from './endpoint-accesses.controller';

describe('EndpointAccessesController', () => {
  let controller: EndpointAccessesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EndpointAccessesController],
    }).compile();

    controller = module.get<EndpointAccessesController>(EndpointAccessesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
