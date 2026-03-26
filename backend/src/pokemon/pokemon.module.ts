import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
  imports: [
    HttpModule,
    CacheModule.register(),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
