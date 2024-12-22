import { styled } from 'styled-components';

export const StickyButton = styled.button`
  position: absolute;
  display: none;
  top: 10px;
  left: 10px;
  z-index: 1000;
  padding: 10px 20px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #068989;
  }
`;
