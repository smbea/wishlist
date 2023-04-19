import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';

import LoginForm from './components/LoginForm';


function App(){

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
      </Routes>
    </Router>
  );
}

export default App;