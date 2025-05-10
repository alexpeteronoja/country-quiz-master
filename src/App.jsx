import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import Quiz from './pages/Quiz';
import Congratulation from './pages/Congratulations';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/congratulation" element={<Congratulation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
