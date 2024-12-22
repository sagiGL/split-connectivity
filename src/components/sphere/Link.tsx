import styled from 'styled-components';

export const Link = styled.div<{
  length: string;
  angle: number;
  colors: string[];
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: rotate(${(props) => props.angle}deg);
  transform-origin: left center;
  transition: all 0.1s linear;
  width: ${(props) => props.length};
  height: 1px;
  background-image: linear-gradient(
    to right,
    ${(props) => props.colors[1]},
    ${(props) => props.colors[0]} 10%,
    ${(props) => props.colors[1]}
  );
  z-index: 1;
`;
