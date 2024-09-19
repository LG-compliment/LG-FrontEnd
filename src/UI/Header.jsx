import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import MyInfo from './MyInfo';
import { NavLink, useNavigate } from 'react-router-dom';

//#region :: styled-components
const HeaderContainer = styled.nav`
  background-color: #EB008B;
  color : white;
  width: 100%;
  height: 170px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
  
const Logo = styled.a`
  margin: 0;
  font-size: 32px;
  color : white;
  font-weight: bold;
  text-decoration: none; //태그 밑줄 없애기
  text-align: center;
  align-content: center;
  width: 250px;
  height: inherit; //header에 상속
  display: inline-block;
  padding-inline: 10px;

`;

const NavContainer = styled.div`
  display: inline-flex;
  height: inherit;
  text-align: center;
  align-items: center;
  justify-content: space-evenly;
  width: 40%;
  
`

const StyledNavLink = styled(NavLink)`
  display: block;
  font-size: 30px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  padding-inline: 10px;

  &:hover{
    color: #FFB3E1;
  }
`

//#endregion

const getServerData = async (navigate) => {
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("authToken");

  // userId 또는 token이 없으면 로그인 페이지로 이동
  if (!userId || !token) {
    alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
    navigate('/login');  // navigate 사용하여 /login으로 이동
    return null;  // 데이터 요청을 더 이상 진행하지 않음
  }

  try {
    const response = await fetch(
      "http://localhost:8080/users/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    
    if (!response.ok) {
      // 응답이 성공적이지 않을 경우
      throw new Error("서버 응답 에러");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("로그인 정보 요청 중 오류 발생:", error);
    alert("로그인 정보 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    navigate('/login');  // 에러 발생 시 /login으로 이동
    return null;
  }
};

function Header() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getServerData(navigate).then((data) => {
      if (data && data.data) {
        setUserName(data.data.name);
      }
    });
  }, [navigate]);  // 주의: userName 대신 빈 배열을 의존성으로 설정 (첫 렌더링 때만 실행되도록)

  return (
    <HeaderContainer>
      <Logo href='/'>COMPLIMENT HUB</Logo>
      <NavContainer>
        {/* 네비게이션바 */}
        <StyledNavLink to='/'>Home</StyledNavLink>
        <StyledNavLink to='/compliments'>Compliment</StyledNavLink>
        <StyledNavLink to='/users'>User</StyledNavLink>
      </NavContainer>
      <MyInfo name={userName} />
    </HeaderContainer>
  );
}

export default Header;