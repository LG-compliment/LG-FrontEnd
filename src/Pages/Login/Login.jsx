import React, { useState } from 'react';
import { authenticateUser } from '../../api/api.js';
import Input from '../../UI/Input.jsx';
import Button from '../../UI/Button.jsx';
import { Heart, HeartHandshake } from 'lucide-react';
import { GlobalStyle, BackGround, LoginContainer, LoginTitle, LoginForm, Signup, ErrorMessage } from './LoginStyle.jsx';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (id === '' || password === '') {
      setError('아이디와 비밀번호를 입력해주세요');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await authenticateUser(id, password);
      if (result.message === "OK") {
        sessionStorage.setItem('authToken', result.data.token);
        sessionStorage.setItem('userId', id);
        alert('로그인 성공');
        window.location.href = '/home';
      } else {
        setError('로그인 실패: ' + (result.message || '서버에서 오류가 발생했습니다.'));
      }
    } catch (error) {
      if (error.status === 401) {
        setError('로그인 실패: 아이디 또는 비밀번호를 확인 해주세요');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <GlobalStyle />
      <BackGround>
        <LoginContainer>
          <LoginTitle>COMPLIMENT</LoginTitle>
          <LoginTitle>HUB</LoginTitle>
          <LoginForm>
            <Input 
              placeholder="아이디를 입력해주세요" 
              value={id} 
              onChange={(event) => setId(event.target.value)}
              disabled={loading}
            />
            <Input 
              type="password"
              placeholder="비밀번호를 입력해주세요" 
              value={password} 
              onChange={(event) => setPassword(event.target.value)}
              disabled={loading}
            />
            <Button type="submit" onClick={handleLogin} disabled={loading}>
              {loading ? <HeartHandshake /> : <Heart />}
            </Button>
            <ErrorMessage visible={error !== null ? 'true' : 'false'}>
              {error}
            </ErrorMessage>
          </LoginForm>
          <Signup href='/sign-up'>회원가입</Signup>
        </LoginContainer>
      </BackGround>
    </>
  );
}

export default Login;