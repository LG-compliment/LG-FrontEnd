import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login'
import ComplimentList from './Pages/ComplimentList'
import UserList from './Pages/UserList'
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
