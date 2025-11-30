import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DealerProvider } from './contexts/DealerContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import DealersPage from './pages/DealersPage/DealersPage';
import './App.css';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <DealerProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="main-content">
            <Header />
            <div className="page-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dealers" element={<DealersPage />} />
              </Routes>
            </div>
          </div>
        </div>
        <Analytics />
      </Router>
    </DealerProvider>
  );
}

export default App;
