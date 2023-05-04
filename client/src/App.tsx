import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginForm from './components/LoginForm';
import MyItems from './components/MyItems'


function App(){

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/items" element={<MyItems/>} />
      </Routes>
    </Router>
  );
}

export default App;