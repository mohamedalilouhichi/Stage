
import LoginForm from './pages/loginform';
import './App.css';
import Index from './pages/index';
import Article from './pages/article';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import CReport from './pages/creport';
import Plans from './pages/plans';
import Services from './pages/services';
import ReportsPage from './pages/ReportsPage';
import Calendarr from './pages/calendarr';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/index" element={<Index />} />
          <Route path="/Creport" element={<CReport />} />
          <Route path="/article" element={<Article />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/services" element={<Services />} />
          <Route path="/reports" element={<ReportsPage/>} />
          <Route path="/calendar" element={<Calendarr/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
