import React from 'react';
import styled from 'styled-components';
import profileImg from '../../images/profile.jpg'

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

// Profile section at the top
const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

// Placeholder for profile image (use an actual image URL if needed)
const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ddd;
`;

// Name and date
const ProfileName = styled.p`
  font-weight: bold;
  margin: 0;
`;

const ProfileDate = styled.p`
  color: gray;
  font-size: 12px;
  margin: 0;
`;

// Compliment content
const ComplimentContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const ComplimentTo = styled.p`
  color: #0000FF; /* Blue color */
  font-weight: bold;
  margin-bottom: 10px;
`;

const ComplimentMessage = styled.p`
  margin: 0;
`;

// Close button
const CloseButton = styled.button`
  align-self: flex-end;
  background-color: #eb008b; /* Pink button */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #d50074;
  }
`;

function ComplimentDetail({ isOpen, closeModal ,selectItem }) {
    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={closeModal}>
        <ModalContent onClick={(e) => e.stopPropagation() /** Prevents modal close on content click */}>
            {/* User Profile Section */}
            <ProfileSection>
            <ProfileImage src={profileImg} alt="Profile" />
            <div>
                <ProfileName>{selectItem.sender.name}</ProfileName>
                <ProfileDate>{selectItem.createAt}</ProfileDate>
            </div>
            </ProfileSection>

            {/* Compliment Content */}
            <ComplimentContainer>
            <ComplimentTo>@{selectItem.receiver.name}</ComplimentTo>
            <ComplimentMessage>{selectItem.content}</ComplimentMessage>
            </ComplimentContainer>

            {/* Close Button */}
            <CloseButton onClick={closeModal}>Close</CloseButton>
        </ModalContent>
        </ModalOverlay>
    );
}

export default ComplimentDetail;
