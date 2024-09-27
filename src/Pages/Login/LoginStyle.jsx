import styled, { createGlobalStyle, keyframes } from 'styled-components';

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

const Signup = styled.a`
  font-size: 12px;
  color : #EB008B;
  font-weight: bold;
  text-decoration: none; //태그 밑줄 없애기
  text-align: center;
  align-content: center;
  display: flex;
  padding: 40px;
  justify-content: center;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
  min-height: 20px;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  animation: ${fadeIn} 0.3s ease-in-out;
`;


export { GlobalStyle, BackGround, LoginContainer, LoginTitle, LoginForm, Signup, ErrorMessage};