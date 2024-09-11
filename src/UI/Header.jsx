import React from 'react'
import styled from 'styled-components';
import MyInfo from './MyInfo';

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

const NavLink = styled.a`
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

function Header() {
  return (
    <HeaderContainer>
      <Logo href='/'>COMPLIMENT HUB</Logo>
      <NavContainer>
        {/* 네비게이션바 */}
        <NavLink href='/'>Home</NavLink>
        <NavLink href='/compliments'>Compliment</NavLink>
        <NavLink href='/users'>User</NavLink>
      </NavContainer>
      <MyInfo></MyInfo>
    </HeaderContainer>
  )
}

export default Header