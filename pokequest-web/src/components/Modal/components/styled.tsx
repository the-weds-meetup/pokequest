import styled from 'styled-components';

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  button {
    height: inherit;
    border: 0;
    display: flex;
    background-color: #fff;
    cursor: pointer;
  }

  h1 {
    margin: 0;
    padding-bottom: 8px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: #00000027 1px solid;

  p {
    margin: 0;
    font-weight: 500;
    color: #00000078;
  }

  .padding {
    padding-bottom: 16px;
  }
`;

export const BodyWrapper = styled.div`
  padding: 24px 0;
`;
