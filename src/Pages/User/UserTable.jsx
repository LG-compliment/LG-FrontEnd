import React, { useEffect, useState } from 'react'
import Button from '../../ui/Button';
import {UserTableContainer, UserTableWrapper, UserTHead, UserTr, UserTBody,CompBtnDiv, UserName, Comment, MyProfileImg} from './UserStyle'
import profileImg from '../../images/profile.jpg'

function UserTableList() {
    const [userList, setUserList] = useState([])
    const getUserList = async(e) =>{
        try{
            const response = await fetch('http://localhost:8080/users', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzI2MTAyNDg5LCJleHAiOjE3Mjk3MDI0ODl9.d96ydH1HDWCb0uNg6jlM9viW5L1M8Jz5oUV6I_9nLNICES6yBlhlwPccPnM9Hs2rMfIbqIUf-8KkQAg0DwJejA'
                }
            });
            const result = await response.json();

            if(result.message == "OK"){
                setUserList(result.data.users)
            }
        }catch(error){
            console.log("데이터 조회 실패")
        }
    }

    useEffect(()=>{
        getUserList()
    },[])

    return (
        <UserTableContainer>
            <Comment>어떤 구성원에게 칭찬 메시지를 보낼까요?</Comment>
            <UserTableWrapper>
                <UserTHead>
                    <UserTr>
                    </UserTr>
                </UserTHead>
                <UserTBody>
                    {
                        userList.map((user, idx)=>{
                            return(

                                <UserTr key={idx}>
                                    <img src={profileImg} alt="profile" style={MyProfileImg} />
                                    <UserName>{user.name}</UserName>
                                <CompBtnDiv>
                                    <Button>칭찬하기</Button>
                                </CompBtnDiv>
                                </UserTr>
                            )
                        })
                    }
                </UserTBody>
            </UserTableWrapper>
        </UserTableContainer>
    )
}

export default UserTableList