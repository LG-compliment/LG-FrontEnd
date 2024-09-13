import React, { useState } from 'react';
import styled from 'styled-components';

const ComplimentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const SearchArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #e91e63;
  }
`;

const SearchButton = styled.button`
  padding: 12px 20px;
  background-color: #e91e63;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #d81b60;
  }
`;

const QuestionText = styled.p`
  margin-bottom: 15px;
  font-size: 16px;
  color: #333;
  text-align: center;
`;

const UserList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
`;

const UserItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #3498db;
  margin-bottom: 10px;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const ComplimentButton = styled.button`
  padding: 8px 15px;
  background-color: #e91e63;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #d81b60;
  }
`;

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