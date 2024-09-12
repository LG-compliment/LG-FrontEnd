import React from 'react'
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import {UserTableContainer, UserTable, UserTHead, UserTr, UserTBody,CompBtnDiv, UserName, Comment, MyProfileImg} from './UserStyle'
import profileImg from '../../images/profile.jpg'

function UserTableList() {
  return (
    <UserTableContainer>
        <Comment>어떤 구성원에게 칭찬 메시지를 보낼까요?</Comment>
        <UserTable>
            <UserTHead>
                <UserTr>
                </UserTr>
            </UserTHead>
            <UserTBody>
                <UserTr>
                    <img src={profileImg} alt="profile" style={MyProfileImg} />
                    <UserName>이민주</UserName>
                <CompBtnDiv>
                    <Button >칭찬하기</Button>
                </CompBtnDiv>
                </UserTr>
            </UserTBody>
        </UserTable>
    </UserTableContainer>
  )
}

export default UserTableList