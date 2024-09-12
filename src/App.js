import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import ComplimentList from './pages/ComplimentList';
import UserList from './pages/User/UserList';
import Header from './ui/Header'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <>
              <Header/> 
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/compliments" element={<ComplimentList />} />
                <Route path="/users" element={<UserList />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;