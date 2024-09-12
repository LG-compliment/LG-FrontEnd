import styled from 'styled-components';

//#region :: styled-components 
const UsersContainer = styled.div`
  width: 100%;
  height: calc(100vh - 170px); //viewport heigth (해당 웹페이지를 실행하고 있는 기기의 화면 크기)
  display: inline-flex;
  flex-direction: column;
  align-items: center;

`
const SearchArea = styled.div`
  width: 30%;
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  
`
const UserTableContainer = styled.div`
  width: 30%;
  height: 60vh;
`
const UserTable = styled.div`
  width: 100%;
  height: 100%;
  border:1px solid #D9D9D9;
  
`
const UserTHead = styled.div`
  background-color: #D9D9D9;
  width: 100%;
  height: 5%;

`

const UserTr = styled.div`
  width: 100%;
  height: 15%;
  /* background-color: #D9D9D9; */
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const CompBtnDiv = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const UserTBody = styled.div`
  width: 100%;
  height: 95%;
  overflow: auto;
  ${UserTr} {
    &:hover{
      background-color: #f0f0f0;
    }
  }
`
const UserName = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-inline-start: 20px;
`

const Comment = styled.span`
  font-size: 10px;
  color: #666666;
`
//#endregion

//html style
const MyProfileImg = {
  width : '50px',
  height : '50px',
  borderRadius : '50%',
  padding : '10px'
}

export {UsersContainer, SearchArea, UserTableContainer, UserTable, UserTHead, UserTr, UserTBody,CompBtnDiv, UserName, Comment, MyProfileImg};