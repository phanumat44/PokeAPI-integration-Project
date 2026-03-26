import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonData } from './pokemon.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('random')
  async getRandomPokemon(): Promise<PokemonData> {
    return this.pokemonService.getRandomPokemon();
  }

  @Get(':name')
  @UseGuards(JwtAuthGuard)
  async getPokemonByName(@Param('name') name: string): Promise<PokemonData> {
    return this.pokemonService.getPokemonByName(name);
  }

  @Get(':name/ability')
  @UseGuards(JwtAuthGuard)
  async getPokemonAbilities(@Param('name') name: string) {
    return this.pokemonService.getPokemonAbilities(name);
  }
}
