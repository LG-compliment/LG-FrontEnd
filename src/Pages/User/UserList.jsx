import React, { useState, useEffect } from 'react'
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import profileImg from '../../images/profile.jpg'
import {UsersContainer, SearchArea, UserTableContainer, UserTableWrapper, UserTHead, UserTr, UserTBody,CompBtnDiv, UserName, Comment, MyProfileImg, NoResult} from './UserStyle';


function UserList(props) {
  const [searchName, setSearchName] = useState('') //검색 Input에 필요한 유저 이름
  const [userList, setUserList] = useState([]) //유저리스트
  const [filteredUsers, setFilteredUsers] = useState([]); // 필터링된 사용자 목록 상태
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

          if(result.message === "OK"){
              setUserList(result.data.users)
              setFilteredUsers(result.data.users); // 초기에는 전체 사용자 목록을 필터링 목록에 저장
          }
      }catch(error){
          console.log("데이터 조회 실패")
      }
  }

  useEffect(()=>{
      getUserList()
  },[])

  const handleSearch = async (e) =>{
    const filtered = userList.filter(user =>
      user.name === searchName // 이름 필터링 (소문자로 변환하여 비교)
    );
    setFilteredUsers(filtered); // 필터링된 목록 저장
  }

  // 검색어에 따라 실시간으로 목록 필터링
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchName(value); // 검색어 상태 업데이트
  };


  return (
    <>
      <UsersContainer>
        <SearchArea>
          <Input placeholder='검색어를 입력하세요' width='200px' 
              value={searchName} 
              onChange={handleChange}></Input>
          <Button onClick={handleSearch}>검색</Button>
        </SearchArea>
        <UserTableContainer>
            <Comment>어떤 구성원에게 칭찬 메시지를 보낼까요?</Comment>
            <UserTableWrapper>
                <UserTHead>
                    <UserTr>
                    </UserTr>
                </UserTHead>
                <UserTBody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, idx)=>{
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
                      ) : (
                        <NoResult>검색 결과가 없습니다.</NoResult>
                      )
                    }
                </UserTBody>
            </UserTableWrapper>
        </UserTableContainer>
      </UsersContainer>
    </>
  )
}

export default UserList