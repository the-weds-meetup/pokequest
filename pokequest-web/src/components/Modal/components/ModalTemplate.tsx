import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000060;

  .modal-card {
    position: fixed;
    background: #ffffff;
    width: 80%;
    height: auto;
    min-height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 32px;
    border-radius: 8px;
  }
`;

const Modal: React.FC = (props) => {
  const { children } = props;

  return (
    <ModalWrapper>
      <div className="modal-card">{children}</div>
    </ModalWrapper>
  );
};

export default Modal;
