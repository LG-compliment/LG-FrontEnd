import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle, css, keyframes } from 'styled-components';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { CircleArrowLeft, ShieldCheck, Info } from 'lucide-react';
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
    display: flex;
    align-items: center;
    position: relative; /* 추가 */
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
  background-color: ${props => props.isChecked ? '#4CAF50' : props.isavailable ? '#FF4136' : '#EB008B'};
  width: 40px;
  height: 40px;
  &:hover {
    background-color: ${props => props.isChecked ? '#4CAF50' : props.isavailable ? '#FF4136' : '#d10079'};
  }

  &:active {
    transform: scale(0.98);
  }
`;


const ItemContainer = styled.div`
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
  
`;

const CheckWrapper = styled.div`
  display: flex;
  flex-direction: column; // 중복 확인 텍스트를 아래로 배치
  align-items: flex-start;
  margin-left: 10px;  // 아이디 입력 필드와 버튼 사이의 간격
`;

const InfoIcon = styled(Info)`
    color: #EB008B;
    margin-inline-start: 3px;
    cursor: pointer;
`;

const InfoTooltip = styled.div`
  position: absolute;
  top: 50%; /* 아이콘의 수직 중앙에 맞추기 */
  left: 100%; /* 아이콘의 오른쪽에 위치하도록 설정 */
  transform: translateY(-50%); /* 수직 중앙 정렬 */
  background-color: #EB008B; /* Compliment Hub 색상 */
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  pointer-events: none;

  &:after {
    content: '';
    position: absolute;
    top: 50%; /* 삼각형의 수직 중앙에 맞추기 */
    left: -5px; /* 삼각형을 툴팁 왼쪽에 위치 */
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent #EB008B transparent transparent; /* 툴팁과 같은 색상으로 삼각형 설정 */
  }
`;



function SignUp() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isIdAvailable, setIsIdAvailable] = useState(false);
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isIdTooltipVisible, setIsIdTooltipVisible] = useState(false);
    const [isNameTooltipVisible, setIsNameTooltipVisible] = useState(false);


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

    const validateId = (id) => { 
        const idPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,12}$/; // 영문 대소문자와 숫자를 모두 포함해야 함, 4~12자
        return idPattern.test(id);
    };
    const validateName = (name) => {
        const namePattern = /^[가-힣]+$/; // 한글만
        return namePattern.test(name);
    };

    const handleCheckId = async (e) => {
        e.preventDefault();
        if (!id) {
            alert('아이디를 입력해주세요.');
            return;
        }

        if (!validateId(id)) { //유효성검사가 맞지 않을 경우 툴팁 보여줌
            setIsIdTooltipVisible(true)
            setTimeout(()=>{
                setIsIdTooltipVisible(false)
            },1000)
            return;
        }

        try {
            if(!isIdChecked){ //중복체크가 false일때만 실행
                const response = await checkId(id);
                setIsIdAvailable(response.data.available);
                setIsIdChecked(true);
                setShowTooltip(true);
            }
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
        if(!validateName(name)){
            
            setIsNameTooltipVisible(true)
            setTimeout(()=>{
                setIsNameTooltipVisible(false)
            },1000)
            return;
        }
        try {
            await signUp(id, password, name);
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
                        <ItemTitle>아이디 
                            <InfoIcon
                                size={15}
                                onMouseEnter={() => setIsIdTooltipVisible(true)}
                                onMouseLeave={() => setIsIdTooltipVisible(false)}
                            />
                            {/* 툴팁 */}
                            <InfoTooltip $isVisible={isIdTooltipVisible}>
                                아이디는 영문 대소문자와 숫자를 모두 포함해야 하며, 길이는 4~12자여야 합니다.
                            </InfoTooltip>
                        </ItemTitle>
                        <ItemContainer>
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
                           
                        </ItemContainer>
                        <ItemTitle>이름
                        <   InfoIcon
                                size={15}
                                onMouseEnter={() => setIsNameTooltipVisible(true)}
                                onMouseLeave={() => setIsNameTooltipVisible(false)}
                            />
                            {/* 툴팁 */}
                            <InfoTooltip $isVisible={isNameTooltipVisible}>
                                이름은 한글만 입력할 수 있습니다.
                            </InfoTooltip>
                        </ItemTitle>
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