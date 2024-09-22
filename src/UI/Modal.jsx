import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input';

// Overlay for the modal background
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.3s ease;
`;

// Main content area for the modal
const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  max-width: 90%;
  width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 25px;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;


// Styled textarea
const TextArea = styled.textarea`
  height: 150px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  resize: none;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: #EB008B;
    box-shadow: 0 0 5px rgba(235, 0, 139, 0.5);
  }
`;

// Button styles
const StyledButton = styled(Button)`
  background-color: #EB008B;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #d10079;
  }

  &:active {
    transform: scale(0.98);
  }
`;

// Cancel button with different styles
const CancelButton = styled(Button)`
  background-color: #aaa;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #888;
  }

  &:active {
    transform: scale(0.98);
  }
`;

// Flex container for buttons
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Modal = ({ isOpen, closeModal, selectedUser }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation() /** Prevents clicks inside modal from closing it */}>
        <Input value={selectedUser.name} disabled={true} />
        <TextArea placeholder="메시지를 입력하세요" />
        <ButtonContainer>
          <StyledButton>전송</StyledButton>
          <CancelButton onClick={closeModal}>취소</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
