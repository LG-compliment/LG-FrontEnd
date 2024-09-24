import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input';
import { createCompliment } from '../api/api'

//#region : Style
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

// Styled select dropdown
const SelectDropdown = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 12px;
  background-color: white;
  color: #333;
  cursor: pointer;

  &:focus {
    border-color: #EB008B;
    box-shadow: 0 0 5px rgba(235, 0, 139, 0.5);
  }
`;
// Styled textarea
const TextArea = styled.textarea`
  height: 150px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  resize: none;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: #EB008B;
    box-shadow: 0 0 5px rgba(235, 0, 139, 0.5);
  }
`;

// Styled checkbox container
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

// Checkbox input style
const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #EB008B;
  cursor: pointer;
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

//#endregion

const Modal = ({ isOpen, closeModal, selectedUser }) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [message , setMessage] = useState('')
  const today = new Date();
  
  if (!isOpen) return null;

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
    setMessage(e.target.value) //text에 같이 반영
  };

  const handleTextChange = (e) => {
    setMessage(e.target.value)
    setSelectedTag('') 
  }

  // 취소 버튼 눌렀을 때 초기화
  const resetForm = () => {
    setSelectedTag('');
    setMessage('');
    setIsAnonymous(false);
    closeModal();
  };

  const sendComplimentMessage = async () => {
    const receiverId = selectedUser.id; //받는사람
    const senderId = sessionStorage.getItem("userId"); //보내는 사람
    const content = message;
    //오늘 날짜 : 'YYYY-MM-DD'
    const createdAt = `${today.getFullYear()}-${(today.getMonth()+1) < 10 ? "0" + (today.getMonth()+1) : (today.getMonth()+1)}-${today.getDate()}`;
    try{
      const compliment = {
        senderId ,
        receiverId,
        content,
        isAnonymous,
        createdAt
      }
      
      const result = await createCompliment(compliment)
      if(result.message === "OK"){
        alert("전송완료")
      }
    }catch (error){
      if(error.status === 409){
        console.log(error.message)
        alert("오늘은 칭찬하기를 보냈어요. 내일 보내주세요!")
      }else{
        alert("전송 중 오류가 발생하였습니다")
      }
    } finally {
      resetForm()
    }
    
  }


  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation() /** Prevents clicks inside modal from closing it */}>
        <Input value={selectedUser.name} disabled={true} />
        {/* Compliment tag dropdown */}
        <SelectDropdown value={selectedTag} onChange={handleTagChange}>
          <option value="">칭찬 템플릿으로 보내기</option>
          <option value="칭찬합니다">칭찬합니다</option>
          <option value="친절함">친절함</option>
          <option value="책임감">책임감</option>
          <option value="팀워크">팀워크</option>
        </SelectDropdown>
        {/* Textarea is disabled if a tag is selected */}
        <TextArea 
          placeholder="메시지를 입력하세요" 
          disabled={selectedTag !== ""}
          onChange={handleTextChange}
          value={message}
        />
        {/* Checkbox for anonymity */}
        <CheckboxContainer>
          <CheckboxInput 
            type="checkbox" 
            checked={isAnonymous} 
            onChange={() => setIsAnonymous(!isAnonymous)} 
          />
          <label>익명으로 보내기</label>
        </CheckboxContainer>
        <ButtonContainer>
          <StyledButton onClick={sendComplimentMessage}>전송</StyledButton>
          <CancelButton onClick={resetForm}>취소</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
