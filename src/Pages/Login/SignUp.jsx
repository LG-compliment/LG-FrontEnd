import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle, css, keyframes } from 'styled-components';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { CircleArrowLeft, ShieldCheck } from 'lucide-react';
import { checkId, signUp } from '../../api/api';


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

const BackIcon = styled(CircleArrowLeft)`
    color: #D9D9D9;
    align-self: flex-start;
    margin: 20px;
`

const CheckBtn = styled(({ isavailable, isChecked, ...rest }) => <Button {...rest} />)`
  background-color: ${props => props.isavailable ? '#4CAF50' : props.isChecked ? '#FF4136' : '#EB008B'};
  width: 40px;
  height: 40px;
  &:hover {
    background-color: ${props => props.isavailable ? '#4CAF50' : props.isChecked ? '#FF4136' : '#d10079'};
  }

  &:active {
    transform: scale(0.98);
  }
`;


const ItemWrapper = styled.div`
    display: flex;
    align-items: center;
`

const InputCustom = styled(Input)`
    align-self: flex-start;
`


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
`;


const TooltipBubble = styled(({ isVisible, isavailable, ...rest }) => <div {...rest} />)`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => props.isavailable ? '#4CAF50' : '#FF4136'};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${props => props.isavailable ? '#4CAF50 transparent transparent transparent' : '#FF4136 transparent transparent transparent'};
  }
  animation: ${props => props.isVisible ? css`${fadeIn} 0.3s ease-out` : css`${fadeOut} 0.3s ease-out`};
  opacity: ${props => props.isVisible ? 1 : 0};
  pointer-events: none;
`;

const CheckText = styled.span`
  color: #EB008B;
  font-size: 12px;
  cursor: pointer;
  margin-top: 5px;  // 버튼과 텍스트 사이의 간격
  &:hover {
    text-decoration: underline;
  }
`;

const CheckWrapper = styled.div`
  display: flex;
  flex-direction: column; // 중복 확인 텍스트를 아래로 배치
  align-items: flex-start;
  margin-left: 10px;  // 아이디 입력 필드와 버튼 사이의 간격
`;

function SignUp() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isIdAvailable, setIsIdAvailable] = useState(false);
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        let timer;
        if (showTooltip) {
            timer = setTimeout(() => {
                setShowTooltip(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showTooltip]);

    const clickBack = () => {
        window.location.href = '/login';
    }

    const handleCheckId = async (e) => {
        e.preventDefault();
        if (!id) {
            alert('아이디를 입력해주세요.');
            return;
        }
        try {
            const response = await checkId(id);
            setIsIdAvailable(response.data.available);
            setIsIdChecked(true);
            setShowTooltip(true);
        } catch (error) {
            console.error("Error checking ID:", error);
            setIsIdAvailable(false);
            setIsIdChecked(true);
            setShowTooltip(true);
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!isIdChecked || !isIdAvailable) {
            alert('아이디 중복 확인을 해주세요.');
            return;
        }
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (!id || !name || !password) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        try {
            const response = await signUp(id, password, name);
            alert('회원가입이 완료되었습니다!');
            window.location.href = '/login';  // 로그인 페이지로 리다이렉트
        } catch (error) {
            console.error("Error signing up:", error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    }

    return (
        <>
            <GlobalStyle />
            <BackGround>
                <SignUpContainer>
                    <BackIcon onClick={clickBack}></BackIcon>
                    <SignUpTitle>Sign Up</SignUpTitle>
                    <SignUpForm>
                        <ItemTitle>아이디</ItemTitle>
                        <ItemWrapper>
                            <InputCustom 
                                placeholder="아이디를 입력해주세요"
                                onChange={(event) => {
                                    setId(event.target.value);
                                    setIsIdChecked(false);
                                }}
                                value={id}
                            />
                            <CheckWrapper>
                                <CheckBtn 
                                    onClick={handleCheckId}
                                    isavailable={isIdAvailable}
                                    isChecked={isIdChecked}
                                >
                                    <ShieldCheck size={20} />
                                    <TooltipBubble isavailable={isIdAvailable} isVisible={showTooltip}>
                                        {isIdAvailable ? '사용 가능한 아이디입니다' : '이미 사용 중인 아이디입니다'}
                                    </TooltipBubble>
                                </CheckBtn>
                                <CheckText onClick={handleCheckId}>중복 확인</CheckText>
                            </CheckWrapper>
                        </ItemWrapper>
                        <ItemTitle>이름</ItemTitle>
                        <InputCustom 
                            placeholder="이름을 입력해주세요" 
                            onChange={(event) => setName(event.target.value)}
                            value={name}
                        />
                        <ItemTitle>비밀번호</ItemTitle>
                        <InputCustom 
                            type="password"
                            placeholder="비밀번호를 입력해주세요" 
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                        />
                        <InputCustom 
                            type="password"
                            placeholder="비밀번호를 한번 더 입력해주세요" 
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            value={confirmPassword}
                        />
                        <SignUpButton onClick={handleSignUp}>회원가입</SignUpButton>   
                    </SignUpForm>
                </SignUpContainer>
            </BackGround>
        </>
    )
}

export default SignUp