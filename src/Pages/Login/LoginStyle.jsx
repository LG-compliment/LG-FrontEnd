import styled, { createGlobalStyle } from 'styled-components';

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
  border-radius: 30px;
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

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  gap: 20px;
`;

export { GlobalStyle, BackGround, LoginContainer, LoginTitle, LoginForm };