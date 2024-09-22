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


export {ComplimentContainer, SearchArea,  SearchButton, QuestionText, UserList, UserItem, Avatar, UserName}
