import { Test, TestingModule } from '@nestjs/testing';
import { HibpService } from './hibp.service';

describe('HibpService', () => {
  let service: HibpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HibpService],
    }).compile();

    service = module.get<HibpService>(HibpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
