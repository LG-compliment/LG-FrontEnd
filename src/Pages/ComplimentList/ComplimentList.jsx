import React, { useEffect, useState } from 'react';
import styled, { keyframes }  from 'styled-components';
import { Search, User, Calendar } from 'lucide-react';
import { fetchCompliments } from '../../api/api';
import ComplimentDetail from './ComplimentDetail';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ComplimentContainer = styled.div`
  background: linear-gradient(45deg, #FFE6F5, #FFD1DC, #FFC0CB);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s ease infinite;
  min-height: calc(100vh - 170px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #EB008B;
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchArea = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  width: 100%;
  max-width: 800px;
`;

const Select = styled.select`
  padding: 15px;
  border: none;
  border-radius: 20px 0 0 20px;
  background-color: white;
  cursor: pointer;
  font-size: 1rem;
  outline: none;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 15px;
  border: none;
  font-size: 1rem;
  outline: none;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

const SearchButton = styled.button`
  padding: 15px 30px;
  background-color: #EB008B;
  color: white;
  border: none;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #C9007A;
  }
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
`;

const MessageItem = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #EB008B;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  box-shadow: 0 5px 10px rgba(235, 0, 139, 0.3);
`;

const SenderName = styled.span`
  font-size: 0.9rem;
  text-align: center;
  color: #EB008B;
  font-weight: bold;
`;

const MessageContent = styled.div`
  flex-grow: 1;
`;

const ReceiverName = styled.span`
  font-weight: bold;
  color: #EB008B;
  font-size: 1.2rem;
  margin-bottom: 10px;
  display: block;
`;

const MessageText = styled.p`
  margin: 10px 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
`;

const DateInfo = styled.span`
  font-size: 0.9rem;
  color: #888;
  display: flex;
  align-items: center;
`;

const StyledIcon = styled.span`
  margin-right: 5px;
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
    const loadCompliments = async () => {
      try {
        setLoading(true);
        const complimentsData = await fetchCompliments();
        setCompliments(complimentsData.data.compliments);
      } catch (err) {
        console.error('Error fetching compliments:', err);
        setError('칭찬 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadCompliments();
  }, []);

  const filteredData = compliments.filter((item) => {
    if (searchType === '받은 유저') {
      return item.receiver.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchType === '보낸 유저') {
      return item.sender.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  });

  if (loading) return <ComplimentContainer><Title>로딩중...</Title></ComplimentContainer>;
  if (error) return <ComplimentContainer>{error}</ComplimentContainer>;

  return (
    <ComplimentContainer>
      <Title>💖 Compliment List 💖</Title>
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
        <SearchButton>
          <Search size={20} />
        </SearchButton>
      </SearchArea>
      <MessageList>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <MessageItem key={index}>
              <AvatarContainer>
                <Avatar>
                  <User size={30} color="white" />
                </Avatar>
                <SenderName>{item.sender === undefined ? "익명" : item.sender.name}</SenderName>
              </AvatarContainer>
              <MessageContent onClick={()=>openModal(item)}>
                <ReceiverName>To: {item.receiver.name}</ReceiverName>
                <MessageText>{item.content}</MessageText>
                <DateInfo>
                  <StyledIcon>
                    <Calendar size={16} />
                  </StyledIcon>
                  {new Date(item.createAt).toLocaleDateString()}
                </DateInfo>
              </MessageContent>
            </MessageItem>
          ))
        ) : (
          <MessageItem>
            <MessageText>일치하는 결과가 없습니다.</MessageText>
          </MessageItem>
        )}
      </MessageList>
      <ComplimentDetail isOpen={isModalOpen} closeModal={closeModal} selectItem={selectItem}>
      </ComplimentDetail>
    </ComplimentContainer>
  );
};

export default ComplimentList;