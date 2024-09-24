import React, { useState } from 'react';
import { authenticateUser } from '../../api/api.js';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { GlobalStyle, BackGround, LoginContainer, LoginTitle, LoginForm } from './LoginStyle.jsx';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (id === '' || password === '') {
      alert('아이디와 비밀번호를 입력해주세요');
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
        window.location.href = '/';
      } else {
        setError('로그인 실패: ' + (result.message || '서버에서 오류가 발생했습니다.'));
      }
    } catch (error) {
      setError('로그인 실패: 네트워크 오류가 발생했습니다. 다시 시도해주세요.');
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
              {loading ? '로그인 중...' : '로그인'}
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </LoginForm>
        </LoginContainer>
      </BackGround>
    </>
  );
}

export default Login;
