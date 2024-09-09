import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import ComplimentList from './pages/ComplimentList'
import UserList from './pages/UserList'
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/compliments' element={<ComplimentList/>}></Route>
        <Route path='/users' element={<UserList/>}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
