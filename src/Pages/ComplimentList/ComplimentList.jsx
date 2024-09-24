import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import ComplimentDetail from './ComplimentDetail';
import { fetchCompliments } from '../../api/api';

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

  const [compliments, setCompliments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectItem, setSelectItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const openModal = (item) => {
    setSelectItem(item)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectItem('')
    setIsModalOpen(false);
  };

  useEffect(() => {
    const loadCompliements = async() => {
      try {
        setLoading(true);
        const complimentsData = await fetchCompliments();
        setCompliments(complimentsData.data.compliments);
      } catch (err) {
        console.error('Error fetching compliments:', err);
        setError('칭찬 목록을 불러오는데 실패했습니다.')
      } finally {
        setLoading(false);
      }
    };

    loadCompliements();
  }, []);


  // 검색 필터링 로직
  const filteredData = compliments.filter((item) => {
    if (searchType === '받은 유저') {
      return item.receiver.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchType === '보낸 유저') {
      return item.sender.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  });

  if (loading) return <div>로딩중</div>
  if (error) return <div>{error}</div>

  return (
    <ComplimentContainer>
      <SearchArea>
        <Select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option>받은 유저</option>
          <option>보낸 유저</option>
        </Select>
        <Input 
          width='600px'
          placeholder="유저 이름을 검색" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button>검색</Button>
      </SearchArea>
      <MessageList>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <MessageItem key={index}>
              <AvatarContainer>
                <Avatar />
                <SenderName>{item.sender.name}</SenderName>
              </AvatarContainer>
              <MessageContent onClick={()=>openModal(item)}>
                <ReceiverName>{item.receiver.name}</ReceiverName>
                <MessageText>{item.content}</MessageText>
              </MessageContent>
            </MessageItem>
          ))
        ) : (
          <p>일치하는 결과가 없습니다.</p>
        )}
    </MessageList>
    <ComplimentDetail isOpen={isModalOpen} closeModal={closeModal} selectItem={selectItem}>
    </ComplimentDetail>
    </ComplimentContainer>
  );
};

export default ComplimentList;