import React from 'react'
import styled from 'styled-components';

const InputText = styled.input`
  width: 250px;
  height: 34px; //default : border 2 padding 1 
  margin-right: 5px;

`

function Input(props) {
  return (
    <InputText placeholder={props.placeholder}/>
  )
}

export default Input