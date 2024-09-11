import React from 'react'
import styled from 'styled-components';
import profileImg from '../images/profile.jpg'

//#region :: styled-components

const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: inherit;
`
const MyInfoDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding-block-end: 30px;
`

const MyLoginDiv = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const InfoLink = styled.a`
    color : white;
    text-decoration: none; //태그 밑줄 없애기
    padding: 10px;
    font-size: 11px;

    &:hover{
    color: #FFB3E1;
  }
`

const NameInfo = styled.span`
    display: inline-flex;
    height: 100%;
    width: 100%;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
`

//#endregion

//html style
const MyProfileImg = {
    width : '50px',
    height : '50px',
    borderRadius : '50%',
    padding : '10px'
}

function MyInfo({name}) { //로그인 정보에서 name get 
  return (
    <>
        <MyInfoContainer>
            <MyLoginDiv>
                <InfoLink>마이페이지</InfoLink>
                <InfoLink>로그아웃</InfoLink>
            </MyLoginDiv>
            <MyInfoDiv>
                <img src={profileImg} alt="profile" style={MyProfileImg} />
                <NameInfo>{!name && '이민주'}님, 반갑습니다.</NameInfo>
            </MyInfoDiv>
        </MyInfoContainer>
    </>
  )
}

export default MyInfo