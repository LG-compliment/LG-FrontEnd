import React from 'react';

import Input from '../../ui/Input'
import Button from '../../ui/Button'

import { GlobalStyle, BackGround, LoginContainer, LoginTitle, LoginForm } from './LoginStyle.jsx'

function Login() {

  const [id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (id === '' || password === '') {
      alert('아이디와 비밀번호를 입력해주세요');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          password: password,
        }),
      });
  
      const result = await response.json();

      if (result.message === "OK") {
        sessionStorage.setItem('authToken', result["data"]["token"]);
        sessionStorage.setItem('userId', id);
        alert('로그인 성공');
        window.location.href = '/compliments';
      } else {
        alert('로그인 실패: ' + result.message || '서버에서 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      alert('로그인 실패: 네트워크 오류가 발생했습니다. 다시 시도해주세요.');
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
            <Input placeholder="아이디를 입력해주세요" value={id} onChange={(event) => {setId(event.target.value)}}></Input>
            <Input placeholder="비밀번호를 입력해주세요" value={password} onChange={(event) => {setPassword(event.target.value)}}></Input>
            <Button type="submit" onClick={handleLogin}>로그인</Button>
          </LoginForm>
        </LoginContainer>
      </BackGround>
    </>
  );
}

export default Login;