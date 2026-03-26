import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import useIllustrationTheme from './theme/themeConfig';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import PokemonPage from './pages/PokemonPage';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  const configProps = useIllustrationTheme();

  return (
    <ConfigProvider {...configProps}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/pokemon" element={<PokemonPage />} />
            </Route>
            <Route path="/" element={<Navigate to="/pokemon" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
