import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  width: 800px;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Container for the input and buttons
const InputButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  gap: 10px;
`;

// Styled textarea
const TextArea = styled.textarea`
  width: 90%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
`;




const Modal = ({ isOpen, closeModal, selectedUser }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation() /** 이벤트가 상위 엘리먼트에 전달되지 않게 막아 줌 */}> 
        <Input value={selectedUser.name} disabled={true} />
        <TextArea placeholder="메시지를 입력하세요" />
        <InputButtonContainer>
          <Button>확인</Button>
          <Button onClick={closeModal}>취소</Button>
        </InputButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
