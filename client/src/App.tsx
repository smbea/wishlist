import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css';

import LoginForm from './components/LoginForm';
import ItemForm from './components/ItemForm';


function App(){

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/add-item" element={<ItemForm/>} />
      </Routes>
    </Router>
  );
}

export default App;