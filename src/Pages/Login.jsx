import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Input from '../ui/Input'
import Button from '../ui/Button'

// 전역 폰트 스타일 정의
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }
`;

const BackGround = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border: 1px solid #D9D9D9;
  width: 600px;
  height: 600px;
`;

const LoginTitle = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  text-align: center;
  color: #EB008B;
  font-size: 48px;
  font-weight: 800;
  word-wrap: break-word;
`;

const LoginForm = styled.form`;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  gap: 20px;
`;

function Login() {
  return (
    <>
      <GlobalStyle />
      <BackGround>
        <LoginContainer>
          <LoginTitle>COMPLIMENT</LoginTitle>
          <LoginTitle>HUB</LoginTitle>
          <LoginForm>
            <Input placeholder="아이디를 입력해주세요" ></Input>
            <Input placeholder="비밀번호를 입력해주세요"></Input>
            <Button>로그인</Button>
          </LoginForm>
        </LoginContainer>
      </BackGround>
    </>
  );
}

export default Login;