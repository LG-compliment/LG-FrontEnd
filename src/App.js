import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import ComplimentList from './pages/ComplimentList/ComplimentList.jsx';
import UserList from './pages/User/UserList.jsx';
import Header from './ui/Header'; 
import './App.css';
import SignUp from './pages/Login/SignUp.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지 (헤더 없이 렌더링) */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* 로그인 페이지를 제외한 나머지 경로에 공통으로 헤더를 적용 */}
        <Route element={<WithHeader />}>
          <Route path="/" element={<Home />} />
          <Route path="/compliments" element={<ComplimentList />} />
          <Route path="/users" element={<UserList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// 헤더를 포함한 레이아웃을 위한 컴포넌트
function WithHeader() {
  return (
    <>
      <Header />
      <Outlet /> {/* 하위 페이지 렌더링 */}
    </>
  );
}