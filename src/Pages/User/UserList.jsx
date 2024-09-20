import React, { useEffect, useState } from 'react';
import {ComplimentContainer, SearchArea, QuestionText, UserList, UserItem, Avatar, UserName} from "./UserStyle.jsx";
import { fetchUsers } from '../../api/api.js';
import Modal from '../../ui/Modal.jsx';
import Button from '../../ui/Button.jsx';
import Input from '../../ui/Input.jsx';

const ComplimentUserList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const usersData = await fetchUsers();
        setUsers(usersData.data.users);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('사용자 정보를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // 검색어에 따른 사용자 필터링
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div>로딩중</div>
  if (error) return <div>{error}</div>

  return (
    <ComplimentContainer>
      <SearchArea>
        <Input 
          width='600px'
          placeholder="검색어를 입력하세요" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={() => {}}>검색</Button> {/* 검색 버튼 클릭 시 별도의 액션 추가 가능 */}
      </SearchArea>
      <QuestionText>어떤 구성원에게 칭찬 메시지를 보낼까요?</QuestionText>
      <UserList>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserItem key={user.id}>
              <Avatar />
              <UserName>{user.name}</UserName>
              <Button onClick={()=>openModal(user)}>칭찬하기</Button>
            </UserItem>
          ))
        ) : (
          <p>일치하는 사용자가 없습니다.</p>
        )}
      </UserList>
      <Modal isOpen={isModalOpen} closeModal={closeModal} selectedUser={selectedUser}>
      </Modal>
    </ComplimentContainer>
  );
};

export default ComplimentUserList;