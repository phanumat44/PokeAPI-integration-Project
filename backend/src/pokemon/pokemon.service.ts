import { Injectable, NotFoundException, InternalServerErrorException, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { PokemonData } from './pokemon.interface';

interface PokeApiType {
  type: { name: string };
}

interface PokeApiAbility {
  ability: { name: string };
}
@Injectable()
export class PokemonService {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.baseUrl = this.configService.get<string>('POKEAPI_URL') ?? 'https://pokeapi.co/api/v2';
  }

  async getPokemonByName(name: string): Promise<PokemonData> {
    const cacheKey = `pokemon_${name}`;
    const cachedData = await this.cacheManager.get<PokemonData>(cacheKey);
    if (cachedData) return cachedData;

    try { 
      console.log("fetching from pokeapi...");

      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/pokemon/${name.toLowerCase()}`),
      );

      const transformedData: PokemonData = {
        name: data.name,
        types: data.types.map((t: PokeApiType) => t.type.name),
        weight: data.weight,
        abilities: data.abilities.map((a: PokeApiAbility) => a.ability.name),
      };

      await this.cacheManager.set(cacheKey, transformedData, 600000); // 10 minutes in ms
      return transformedData;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new NotFoundException(`Pokemon ${name} not found`);
      }
      throw new InternalServerErrorException('Error fetching from PokeAPI');
    }
  }

  async getPokemonAbilities(name: string) {
    const data = await this.getPokemonByName(name);
    return {
      name: data.name,
      abilities: data.abilities,
    };
  }


  async getRandomPokemon() {
    // There are currently ~1025 pokemons
    const randomId = Math.floor(Math.random() * 1025) + 1;
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/pokemon/${randomId}`),
      );
      return {
        name: data.name,
        types: data.types.map((t) => t.type.name),
        weight: data.weight,
        abilities: data.abilities.map((a) => a.ability.name),
      };
    } catch (error) {
      throw new InternalServerErrorException('Error fetching random pokemon from PokeAPI');
    }
  }
}
