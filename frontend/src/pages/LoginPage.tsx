import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLogin } from '../hooks/useLogin';

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { loading, error, handleLogin } = useLogin();

  useEffect(() => {
    document.title = 'Login | Pokemon Dashboard';
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/pokemon" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <Title level={2}>Pokemon Dashboard</Title>
          <p className="text-gray-500">Sign in to your account</p>
        </div>
        {error && (
          <Alert message={error} type="error" showIcon className="mb-6" />
        )}
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
