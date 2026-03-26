import { useState } from 'react';
import { AxiosError } from 'axios';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

interface LoginValues {
  username: string;
  password: string;
}

interface UseLoginReturn {
  loading: boolean;
  error: string | null;
  handleLogin: (values: LoginValues) => Promise<void>;
}

export const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (values: LoginValues): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<{ access_token: string }>('/login', values);
      login(response.data.access_token);
      message.success('Login successful!');
      navigate('/pokemon');
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const errorMessage = axiosError.response?.data?.message || 'Login failed! Please check your credentials.';
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleLogin };
};
