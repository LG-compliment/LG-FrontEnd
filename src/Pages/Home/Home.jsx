import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Award, Trophy } from 'lucide-react';
import { fetchReceiverArchievement, fetchSenderArchievement } from '../../api/api';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const sparkleAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const HomeContainer = styled.div`
  background: linear-gradient(45deg, #FFE6F5, #FFD1DC, #FFC0CB);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s ease infinite;
  min-height: calc(100vh - 170px);
  padding: 40px;
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

const RankingContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;
`;

const RankingBox = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  width: 45%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const RankingTitle = styled.h2`
  color: #EB008B;
  margin-bottom: 20px;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 1px 1px 2px rgba(235, 0, 139, 0.3);
`;

const RankingList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RankingItem = styled.li`
  margin-bottom: 15px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: linear-gradient(45deg, #FFF0F5, #FFE4E1);
  border-radius: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const RankingIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 10px;
  animation: ${sparkleAnimation} 2s infinite;
`;

const RankingName = styled.span`
  font-weight: bold;
  color: #EB008B;
`;

const RankingCount = styled.span`
  background-color: #EB008B;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
`;

const MessageBox = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const MessageText = styled.p`
  font-size: 2rem;
  color: #EB008B;
  font-weight: bold;
  margin: 0;
  animation: ${floatAnimation} 3s ease-in-out infinite;
`;

const StyledIcon = styled.span`
  color: gold;
  margin-right: 10px;
  animation: ${sparkleAnimation} 2s infinite;
`;

const Home = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [senders, setSenders] = useState([]);
    const [receivers, setReceivers] = useState([]);

    useEffect(() => {
        const loadArchievment = async() => {
            try {
                setLoading(true);
                const senders = await fetchSenderArchievement();
                const receivers = await fetchReceiverArchievement();

                setSenders(senders.data.achievements);
                setReceivers(receivers.data.achievements);
            } catch (err) {
                console.error('Error fetching archievement:', err);
                setError('정보를 불러오는데 실패했습니다.')
            } finally {
                setLoading(false);
            }
        }
        loadArchievment();
    }, [])

    if (loading) return <div>로딩중</div>
    if (error) return <div>{error}</div>

  return (
    <HomeContainer>
      <Title>🏆 COMPLIMENT RANKING 🏆</Title>
      <RankingContainer>
        <RankingBox>
          <RankingTitle>
            <StyledIcon><Trophy size={30} /></StyledIcon>
            이달의 칭찬 전도사
          </RankingTitle>
          <RankingList>
            {senders.map((item, index) => (
              <RankingItem key={index}>
                <div>
                  <RankingIcon>{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</RankingIcon>
                  <RankingName>{item.userName}</RankingName>
                </div>
                <RankingCount>{item.complimentsCount}개</RankingCount>
              </RankingItem>
            ))}
          </RankingList>
        </RankingBox>
        <RankingBox>
          <RankingTitle>
            <StyledIcon><Award size={30} /></StyledIcon>
            이달의 칭찬 수집가
          </RankingTitle>
          <RankingList>
            {receivers.map((item, index) => (
              <RankingItem key={index}>
                <div>
                  <RankingIcon>{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</RankingIcon>
                  <RankingName>{item.userName}</RankingName>
                </div>
                <RankingCount>{item.complimentsCount}개</RankingCount>
              </RankingItem>
            ))}
          </RankingList>
        </RankingBox>
      </RankingContainer>
      <MessageBox>
        <MessageText>You are Amazing!</MessageText>
      </MessageBox>
    </HomeContainer>
  );
};

export default Home;