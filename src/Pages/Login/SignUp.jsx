import React from 'react'
import styled, { createGlobalStyle } from 'styled-components';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { CircleArrowLeft } from 'lucide-react';

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

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  border: 1px solid #D9D9D9;
  width: 600px;
  height: 600px;
  border-radius: 30px;
`;

const SignUpTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #EB008B;
  font-size: 48px;
  font-weight: 800;
  word-wrap: break-word;
  height: 150px;
`;
const SignUpForm = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  gap: 10px;
`;

const ItemTitle = styled.div`
    font-size: 12px;
    align-self: flex-start;
`

const SignUpButton = styled(Button)`
    font-weight: bold;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #d10079;
    }

    &:active {
        transform: scale(0.98);
    }
`

const Icon = styled(CircleArrowLeft)`
    color: #D9D9D9;
    align-self: flex-start;
    margin: 20px;
`

function SignUp() {
    const clickBack = ()=>{
        window.location.href = '/login';
    }
    return (
        <>
            <GlobalStyle />
            <BackGround>
                <SignUpContainer>
                    <Icon onClick={clickBack}></Icon>
                    <SignUpTitle>Sign Up</SignUpTitle>
                    <SignUpForm>
                        <ItemTitle>아이디</ItemTitle>
                        <Input 
                            placeholder="아이디를 입력해주세요" 
                            
                        />
                        <ItemTitle>이름</ItemTitle>
                        <Input 
                            placeholder="이름을 입력해주세요" 
                            
                        />
                        <ItemTitle>비밀번호</ItemTitle>
                        <Input 
                            type="password"
                            placeholder="비밀번호를 입력해주세요" 
                            
                        />
                        <SignUpButton>회원가입</SignUpButton>   
                    </SignUpForm>
                </SignUpContainer>
            </BackGround>
        </>
    )
}

export default SignUp