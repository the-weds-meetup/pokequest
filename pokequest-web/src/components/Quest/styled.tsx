import styled from 'styled-components';

export const Card = styled.button`
  width: 100%;
  padding: 12px 30px 12px 12px;
  margin: 12px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;

  border-radius: 8px;
  border: 1px solid #00000012;
  background-color: #e3e3e3;
  cursor: pointer;

  :hover {
    background-color: #cfcfcf;
  }

  .time {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 300;
    letter-spacing: 0.5px;
    text-align: right;

    p {
      font-weight: 500;
      margin: 0;
      margin-bottom: 8px;
    }
  }
`;
