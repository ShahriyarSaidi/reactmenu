import { Toaster } from '@/components/ui/toaster';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '@/lib/LanguageContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import Home from './pages/Home';
import Menu from './pages/Menu';

function NotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ background: '#0A0A0A' }}>
      <p className="font-body text-sm tracking-widest uppercase" style={{ color: '#6E6E6E' }}>Səhifə tapılmadı</p>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
