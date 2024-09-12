import React, { useState } from 'react'
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import {UsersContainer, SearchArea} from './UserStyle';
import UserTableList from './UserTable';


function UserList(props) {
  const handleSearch = async (e) =>{
    alert('hi')
  }
  return (
    <>
      <UsersContainer>
        <SearchArea>
          <Input placeholder='검색어를 입력하세요' width='200px'></Input>
          <Button onClick={handleSearch}>검색</Button>
        </SearchArea>
        <UserTableList></UserTableList>
      </UsersContainer>
    </>
  )
}

export default UserList