import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 32px;

  button {
    margin: 0 auto;
    padding: 16px 32px;
    min-width: 300px;

    background-color: #037bff;
    border-radius: 4px;
    border: #00000027 1px solid;
    color: white;
    font-size: 1.2em;
    cursor: pointer;
  }

  button :disabled {
    background-color: #00000056;
    color: #00000056;
  }
`;
