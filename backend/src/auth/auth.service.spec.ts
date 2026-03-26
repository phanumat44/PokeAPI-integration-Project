import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let repo: typeof mockRepo;
  let jwt: typeof mockJwt;

  const mockRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockJwt = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockRepo },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repo = module.get(getRepositoryToken(User));
    jwt = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should successfully register a user', async () => {
      repo.findOne.mockResolvedValue(null);
      repo.save.mockResolvedValue({ id: 1, username: 'test' });
      
      const result = await service.register({ username: 'test', password: 'password' });
      expect(result).toEqual({ message: 'registered successfully' });
    });

    it('should throw ConflictException if user exists', async () => {
      repo.findOne.mockResolvedValue({ id: 1, username: 'test' });
      await expect(service.register({ username: 'test', password: 'password' }))
        .rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should return access token on successful login', async () => {
      const hashedPassword = await bcrypt.hash('password', 10);
      repo.findOne.mockResolvedValue({ id: 1, username: 'test', password: hashedPassword });
      jwt.sign.mockReturnValue('mock_token');

      const result = await service.login({ username: 'test', password: 'password' });
      expect(result).toEqual({ access_token: 'mock_token' });
    });

    it('should throw UnauthorizedException on invalid password', async () => {
      const hashedPassword = await bcrypt.hash('wrong_password', 10);
      repo.findOne.mockResolvedValue({ id: 1, username: 'test', password: hashedPassword });

      await expect(service.login({ username: 'test', password: 'password' }))
        .rejects.toThrow(UnauthorizedException);
    });
  });
});
