import React, { useEffect } from 'react';
import styled from 'styled-components';

import { IQuest } from '../../../interfaces';

interface Props {
  type: 'available' | 'accepted' | 'await';
  quest: IQuest;
  handleClose: () => void;
}

const ModalWrapper = styled.div`
  position: fixed;
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

const Modal: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <ModalWrapper>
      <div className="modal-card">{children}</div>
    </ModalWrapper>
  );
};

export default Modal;
