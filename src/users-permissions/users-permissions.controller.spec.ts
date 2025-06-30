import { Test, TestingModule } from '@nestjs/testing';
import { UsersPermissionsController } from './users-permissions.controller';

describe('UsersPermissionsController', () => {
  let controller: UsersPermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersPermissionsController],
    }).compile();

    controller = module.get<UsersPermissionsController>(UsersPermissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
