import { Test, TestingModule } from '@nestjs/testing';
import { EndpointAccessesService } from './endpoint-accesses.service';

describe('EndpointAccessesService', () => {
  let service: EndpointAccessesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndpointAccessesService],
    }).compile();

    service = module.get<EndpointAccessesService>(EndpointAccessesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
