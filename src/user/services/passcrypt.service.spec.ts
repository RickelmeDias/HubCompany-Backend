import { Test, TestingModule } from '@nestjs/testing';
import { PasscryptService } from './passcrypt.service';

describe('PasscryptService', () => {
  let service: PasscryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasscryptService],
    }).compile();

    service = module.get<PasscryptService>(PasscryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
