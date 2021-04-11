import React from 'react';
import styled from 'styled-components';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';

const Wrapper = styled.button`
  height: 96px;
  display: flex;
  flex-direction: rows;
  align-items: center;
  justify-content: center;
  font-weight: 600;

  border-style: dotted;
  border-width: 3px;
  background-color: transparent;
  cursor: pointer;

  :hover {
    background-color: #00000012;
  }

  span {
    padding-left: 8px;
    color: #00000087;
  }
`;

interface Props {
  onOpen: () => void;
}

const AddButton: React.FC<Props> = (props) => {
  const { onOpen } = props;

  const handleOpen = () => {
    onOpen();
  };

  return (
    <Wrapper onClick={handleOpen}>
      <Icon path={mdiPlus} size={1} horizontal vertical color="#00000087" />
      <span> Add a Quest</span>
    </Wrapper>
  );
};

export default AddButton;
