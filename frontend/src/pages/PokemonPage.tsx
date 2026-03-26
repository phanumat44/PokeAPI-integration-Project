import React, { useEffect } from 'react';
import { Form, Input, Card, Typography, Spin, Alert, Tag, Space, Button } from 'antd';
import { SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { usePokemon } from '../hooks/usePokemon';

const { Title, Text } = Typography;

const typeColors: Record<string, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  flying: '#A890F0',
  fighting: '#C03028',
  poison: '#A040A0',
  electric: '#F8D030',
  ground: '#E0C068',
  rock: '#B8A038',
  psychic: '#F85888',
  ice: '#98D8D8',
  bug: '#A8B820',
  ghost: '#705898',
  steel: '#B8B8D0',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
};

const PokemonPage: React.FC = () => {
  const { data, loading, error, searchPokemon, fetchRandomPokemon } = usePokemon();
  const { logout } = useAuth();

  useEffect(() => {
    if (data) {
      document.title = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)} | Pokemon Explorer`;
    } else {
      document.title = 'Pokemon Explorer';
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <Title level={2} className="!mb-0 text-center sm:text-left">Pokemon Explorer</Title>
          <Button icon={<LogoutOutlined />} onClick={logout} danger className="w-full sm:w-auto">
            Logout
          </Button>
        </div>

        <Card className="mb-8 shadow-sm">
          <Form onFinish={searchPokemon} className="flex flex-col md:flex-row gap-4 items-center">
            <Form.Item
              name="pokemonName"
              rules={[{ required: true, message: 'Please enter a Pokemon name' }]}
              className="w-full md:flex-1 !mb-0"
            >
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search Pokemon (e.g., pikachu, bulbasaur)"
                size="large"
              />
            </Form.Item>
            <Form.Item className="w-full md:w-auto !mb-0">
              <Space className="w-full justify-center">
                <Button type="primary" htmlType="submit" size="large" loading={loading} className="px-8">
                  Search
                </Button>
                <Button size="large" onClick={fetchRandomPokemon} disabled={loading}>
                  Random
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        {loading && (
          <div className="text-center p-12">
            <Spin size="large" />
          </div>
        )}

        {error && (
          <Alert message={error} type="error" showIcon className="mb-8" />
        )}

        {data && !loading && (
          <>
            <Card className="shadow-md border-t-4 border-blue-500 mb-6">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start p-4">
                <div className="flex-1 text-center md:text-left">
                  <Title level={1} className="capitalize !mb-2 w-full">
                    {data.name}
                  </Title>
                  <div className="mb-4">
                    <Space size={[4, 8]} wrap>
                      {data.types.map((type) => (
                        <Tag 
                          color={typeColors[type.toLowerCase()] || 'blue'} 
                          key={type} 
                          className="capitalize px-4 py-1 text-sm font-semibold border-none"
                        >
                          {type}
                        </Tag>
                      ))}
                    </Space>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <Text type="secondary">Basic Stats</Text>
                    <div className="mt-2">
                      <Text strong>Weight: </Text>
                      <Text>{data.weight / 10} kg</Text>
                    </div>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <Card title="Abilities" size="small" className="bg-blue-50">
                    <ul className="list-disc pl-5">
                      {data.abilities.map((ability) => (
                        <li key={ability} className="capitalize text-gray-700 mb-1">
                          {ability}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </div>
            </Card>

            <Card title="Raw JSON Response" className="shadow-md mb-8">
              <pre className="bg-gray-900 p-4 rounded-lg overflow-auto max-h-[400px] text-sm font-mono leading-relaxed">
                {JSON.stringify(data, null, 2).split('\n').map((line, i) => {
                  const parts = line.split(/(\".*?\"\s*:|\".*?\"|\b\d+\b|true|false|null)/g);
                  return (
                    <div key={i}>
                      {parts.map((part, j) => {
                        let color = 'text-gray-300';
                        if (/^\".*?\"\s*:/.test(part)) color = 'text-purple-400';
                        else if (/^\".*?\"/.test(part)) color = 'text-green-400';
                        else if (/\b\d+\b/.test(part)) color = 'text-blue-400';
                        else if (/true|false/.test(part)) color = 'text-orange-400';
                        else if (/null/.test(part)) color = 'text-red-400';
                        return <span key={j} className={color}>{part}</span>;
                      })}
                    </div>
                  );
                })}
              </pre>
            </Card>
          </>
        )}

        {!data && !loading && !error && (
          <div className="text-center py-20 text-gray-400">
            <SearchOutlined style={{ fontSize: 64, marginBottom: 16 }} />
            <p>Enter a Pokemon name to start exploring</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonPage;
