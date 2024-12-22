import styled from 'styled-components';

export interface ILinkData {
  id?: string;
  length: number;
  angle: number;
  colors: string[];
  sphereSize: number;
}
export const Link = styled.div<ILinkData>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: rotate(${(props) => props.angle}deg);
  transform-origin: left center;
  /* transition: all 0.1s linear; */
  transition: ${(props) =>
    Math.abs(props.angle) - 0.5 < 175 && 'all 0.1s linear'};
  width: ${(props) => props.length + 'px'};
  height: 1px;
  background-image: linear-gradient(
    to right,
    ${(props) => props.colors[1]},
    ${(props) => props.colors[0]} 10%,
    ${(props) => props.colors[1]}
  );
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
    width: ${(props) => 100 - props.length / 10 + 'px'};
    border: 1px solid ${(props) => props.colors[0]};
    border-radius: 50%;
    aspect-ratio: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
    width: ${(props) =>
      props.sphereSize / 5 + 'px'}; /* Use the sphereSize prop */
    border: 1px solid ${(props) => props.colors[1]};
    border-radius: 50%;
    aspect-ratio: 1;
  }
`;
