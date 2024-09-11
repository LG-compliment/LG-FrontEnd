import React from 'react'
import styled from 'styled-components';

const InputText = styled.input`
  width: ${(props) => props.width || '250px'}; //props로 길이를 받지 않으면 default(=250px) 
  height: 36px; //버튼이랑 height 통일
  margin-right: 5px;
  border:1px solid #D9D9D9;
  border-radius: 5px;
  padding-left: 10px;

`

function Input(props) {
  return (
    <InputText placeholder={props.placeholder} width={props.width}/>
  )
}

export default Input