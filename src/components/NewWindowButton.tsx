import { styled } from 'styled-components';

export const StickyButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
