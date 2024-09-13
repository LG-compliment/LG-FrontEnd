import React, { useState } from 'react';
import styled from 'styled-components';

const ComplimentContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
`;

const Input = styled.input`
  flex-grow: 1;
  margin: 0 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #e91e63;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageItem = styled.div`
  display: flex;
  background-color: #f0f0f0;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 10px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  margin-bottom: 5px;
`;

const SenderName = styled.span`
  font-size: 12px;
  text-align: center;
`;

const MessageContent = styled.div`
  flex-grow: 1;
`;

const ReceiverName = styled.span`
  font-weight: bold;
  color: #3498db;
  margin-right: 10px;
`;

const MessageText = styled.p`
  margin: 5px 0;
`;

const ComplimentList = () => {
  const [searchType, setSearchType] = useState('받은 유저');
  const [searchQuery, setSearchQuery] = useState('');

  const dummyData = [
    { sender: '이민주', receiver: '고명진', message: '최선을 다하는 모습이 보기 좋습니다~!!' },
    { sender: '이민주', receiver: '익명', message: '#칭찬합니다' },
    { sender: '이민주', receiver: '익명', message: '' },
    { sender: '이민주', receiver: '익명', message: '' },
  ];

  // 검색 필터링 로직
  const filteredData = dummyData.filter((item) => {
    if (searchType === '받은 유저') {
      return item.receiver.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchType === '보낸 유저') {
      return item.sender.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  });

  return (
    <ComplimentContainer>
      <SearchArea>
        <Select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option>받은 유저</option>
          <option>보낸 유저</option>
        </Select>
        <Input 
          placeholder="유저 이름을 검색" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton>검색</SearchButton>
      </SearchArea>
      <MessageList>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <MessageItem key={index}>
              <AvatarContainer>
                <Avatar />
                <SenderName>{item.sender}</SenderName>
              </AvatarContainer>
              <MessageContent>
                <ReceiverName>{item.receiver}</ReceiverName>
                <MessageText>{item.message}</MessageText>
              </MessageContent>
            </MessageItem>
          ))
        ) : (
          <p>일치하는 결과가 없습니다.</p>
        )}
      </MessageList>
    </ComplimentContainer>
  );
};

export default ComplimentList;