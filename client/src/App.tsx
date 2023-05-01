import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css';

import LoginForm from './components/LoginForm';
import ItemForm from './components/ItemForm';
import MyItems from './components/MyItems'


function App(){

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/add-item" element={<ItemForm/>} />
        <Route path="/items" element={<MyItems/>} />
      </Routes>
    </Router>
  );
}

export default App;