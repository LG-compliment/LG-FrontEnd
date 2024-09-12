import React from 'react'
import styled from 'styled-components';

const InputText = styled.input`
  width: ${(props) => props.width || '250px'}; //props로 길이를 받지 않으면 default(=250px) 
  height: 36px; //버튼이랑 height 통일
  margin-right: 5px;
  border:1px solid #D9D9D9;
  border-radius: 5px;
  padding-left: 10px;
  box-shadow: 1px 1px 1px gray;
`

function Input({ placeholder, width, ...props }) {
  return (
    <InputText placeholder={placeholder} width={width} {...props} />
  )
}


export default Input