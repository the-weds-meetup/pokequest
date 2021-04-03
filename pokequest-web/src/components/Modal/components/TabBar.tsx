import React from 'react';
import styled from 'styled-components';

interface ITabBar {
  currentIndex: number;
  tabNames: string[];
  handleTabChange: (index: number) => void;
}

const Wrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  align-content: flex-start;

  .active {
    border-bottom: #037bff 4px solid;
    color: #037bff;
  }
`;

const TabWrapper = styled.div`
  cursor: pointer;
  border: 0;
  height: 48px;
  min-width: 150px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabBar: React.FC<ITabBar> = (props) => {
  const { currentIndex, tabNames, handleTabChange } = props;
  return (
    <Wrapper>
      {tabNames.map((tabName, index) =>
        index === currentIndex ? (
          <TabWrapper
            key={index}
            className="active"
            onClick={() => handleTabChange(index)}
          >
            {tabName}
          </TabWrapper>
        ) : (
          <TabWrapper key={index} onClick={() => handleTabChange(index)}>
            {tabName}
          </TabWrapper>
        )
      )}
    </Wrapper>
  );
};

export default TabBar;
