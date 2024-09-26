import React, { useEffect, useState } from 'react';
import { Search, User } from 'lucide-react';
import { fetchUsers } from '../../api/api.js';
import Modal from '../../ui/Modal.jsx';
import {ComplimentContainer, Title, SearchArea, Input, SearchButton, UserList, UserItem, UserName, Avatar,DisableButton} from './UserStyle.jsx'
import Button from '../../ui/Button.jsx';

const ComplimentUserList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const usersData = await fetchUsers();
        setUsers(usersData.data.users);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('사용자 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <ComplimentContainer><Title>로딩중...</Title></ComplimentContainer>;
  if (error) return <ComplimentContainer><Title>{error}</Title></ComplimentContainer>;

  return (
    <ComplimentContainer>
      <Title>💖 User List 💖</Title>
      <SearchArea>
        <Input 
          placeholder="유저 이름을 검색" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchButton>
          <Search size={20} />
        </SearchButton>
      </SearchArea>
      <UserList>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserItem key={user.id}>
              <Avatar>
                <User size={40} color="white" />
              </Avatar>
              <UserName>{user.name}</UserName>
              {user.id === sessionStorage.getItem("userId")? 
                <DisableButton>칭찬하기</DisableButton> : 
                <Button onClick={() =>openModal(user)}>칭찬하기</Button>
              }
            </UserItem>
          ))
        ) : (
          <UserItem>
            <UserName>일치하는 사용자가 없습니다.</UserName>
          </UserItem>
        )}
      </UserList>
      <Modal isOpen={isModalOpen} closeModal={closeModal} selectedUser={selectedUser}>
        {/* Modal content here */}
      </Modal>
    </ComplimentContainer>
  );
};

export default ComplimentUserList;