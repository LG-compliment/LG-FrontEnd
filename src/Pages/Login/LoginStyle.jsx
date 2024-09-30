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
  padding: 10px;
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

const SlackLoginButton = () => {
  return (
    <a
      href="https://slack.com/openid/connect/authorize?scope=openid%20email%20profile&amp;response_type=code&amp;redirect_uri=https%3A%2F%2Fcompliment-hub.site%2Fapi%2Foauth2%2Fcallback%2Fslack&amp;client_id=7102032032211.7802787937170"
      style={{
        alignItems: 'center',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        display: 'inline-flex',
        fontFamily: 'Lato, sans-serif',
        fontSize: '16px',
        fontWeight: 600,
        height: '48px',
        justifyContent: 'center',
        textDecoration: 'none',
        width: '256px'
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: '20px', width: '20px', marginRight: '12px' }}
        viewBox="0 0 122.8 122.8"
      >
        <path
          d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
          fill="#e01e5a"
        ></path>
        <path
          d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
          fill="#36c5f0"
        ></path>
        <path
          d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
          fill="#2eb67d"
        ></path>
        <path
          d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
          fill="#ecb22e"
        ></path>
      </svg>
      Sign in with Slack
    </a>
  );
};

export { GlobalStyle, BackGround, LoginContainer, LoginTitle, LoginForm, Signup, ErrorMessage, SlackLoginButton};