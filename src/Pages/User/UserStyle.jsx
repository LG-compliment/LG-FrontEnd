import styled, { keyframes } from 'styled-components';
import Button from '../../UI/Button';

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

const Input = styled.input`
  flex-grow: 1;
  padding: 15px;
  border: none;
  border-radius: 20px 0 0 20px;
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

const UserList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
`;

const UserItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  margin: 10px;
  padding: 20px;
  width: 200px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #EB008B;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  box-shadow: 0 5px 10px rgba(235, 0, 139, 0.3);
`;

const UserName = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #EB008B;
  margin-bottom: 10px;
  text-align: center;
`;


const DisableButton = styled(Button)`
  background-color: #aaa;
  color: white;
  border: none;
  cursor: pointer;
`;

export {ComplimentContainer, Title, SearchArea, Input, SearchButton, UserList, UserItem, UserName, Avatar, DisableButton}