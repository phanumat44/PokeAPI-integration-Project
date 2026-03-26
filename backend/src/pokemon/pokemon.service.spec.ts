import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { of } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

describe('PokemonService', () => {
  let service: PokemonService;
  let http: typeof mockHttp;
  let cache: typeof mockCache;

  const mockHttp = {
    get: jest.fn(),
  };

  const mockConfig = {
    get: jest.fn((key: string) => {
      if (key === 'POKEAPI_URL') return 'https://pokeapi.co/api/v2';
      return null;
    }),
  };

  const mockCache = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: HttpService, useValue: mockHttp },
        { provide: ConfigService, useValue: mockConfig },
        { provide: CACHE_MANAGER, useValue: mockCache },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    http = module.get(HttpService);
    cache = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPokemonByName', () => {
    it('should return cached data if available', async () => {
      const cachedData = { name: 'pikachu', types: ['electric'] };
      cache.get.mockResolvedValue(cachedData);

      const result = await service.getPokemonByName('pikachu');
      expect(result).toEqual(cachedData);
      expect(http.get).not.toHaveBeenCalled();
    });

    it('should fetch and transform data from PokeAPI', async () => {
      cache.get.mockResolvedValue(null);
      const apiResponse = {
        data: {
          name: 'pikachu',
          types: [{ type: { name: 'electric' } }],
          weight: 60,
          abilities: [{ ability: { name: 'static' } }],
        },
      };
      http.get.mockReturnValue(of(apiResponse));

      const result = await service.getPokemonByName('pikachu');
      expect(result.name).toBe('pikachu');
      expect(result.types).toContain('electric');
      expect(cache.set).toHaveBeenCalled();
    });

    it('should throw NotFoundException if pokemon not found', async () => {
      cache.get.mockResolvedValue(null);
      const error = { response: { status: 404 } };
      http.get.mockImplementation(() => { throw error; });

      await expect(service.getPokemonByName('unknown'))
        .rejects.toThrow(NotFoundException);
    });
  });
});
