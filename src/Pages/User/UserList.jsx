import React, { useState } from 'react';
import {ComplimentContainer, SearchArea, Input, SearchButton, QuestionText, UserList, UserItem, Avatar, UserName, ComplimentButton} from "./UserStyle.jsx";

const ComplimentUserList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const dummyUsers = [
    { id: 1, name: '3' },
    { id: 2, name: 'www' },
    { id: 3, name: 'John' },
    { id: 4, name: 'Jane' },
    { id: 5, name: 'Bob' },
    { id: 6, name: 'Alice' },
  ];

  // 검색어에 따른 사용자 필터링
  const filteredUsers = dummyUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ComplimentContainer>
      <SearchArea>
        <Input 
          placeholder="검색어를 입력하세요" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton onClick={() => {}}>검색</SearchButton> {/* 검색 버튼 클릭 시 별도의 액션 추가 가능 */}
      </SearchArea>
      <QuestionText>어떤 구성원에게 칭찬 메시지를 보낼까요?</QuestionText>
      <UserList>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserItem key={user.id}>
              <Avatar />
              <UserName>{user.name}</UserName>
              <ComplimentButton>칭찬하기</ComplimentButton>
            </UserItem>
          ))
        ) : (
          <p>일치하는 사용자가 없습니다.</p>
        )}
      </UserList>
    </ComplimentContainer>
  );
};

export default ComplimentUserList;