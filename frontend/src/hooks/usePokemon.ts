import { useState } from 'react';
import { AxiosError } from 'axios';
import api from '../api/axios';
import type { PokemonData } from '../types/pokemon.types';

interface SearchValues {
  pokemonName: string;
}

interface UsePokemonReturn {
  data: PokemonData | null;
  loading: boolean;
  error: string | null;
  searchPokemon: (values: SearchValues) => Promise<void>;
  fetchRandomPokemon: () => Promise<void>;
}

export const usePokemon = (): UsePokemonReturn => {
  const [data, setData] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchPokemon = async (values: SearchValues): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<PokemonData>(`/pokemon/${values.pokemonName.toLowerCase()}`);
      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || 'Pokemon not found');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomPokemon = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<PokemonData>('/pokemon/random');
      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || 'Failed to fetch random Pokemon');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, searchPokemon, fetchRandomPokemon };
};
