import { keyframes, styled } from "styled-components";

export const SphereWrapper = styled.div<{ position: { x: number; y: number; width: number; height: number }, size: string, color: string }>`
  position: fixed; /* Position fixed for centering relative to the viewport */
  top: 50%;
  left: 50%;
  width: ${(props) => props.size};
  aspect-ratio: 1/1;
  transform: translate(-50%, -50%); /* Center the sphere */
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  border-radius: 50%;
  border: 1px solid ${(props) => props.color};
  transition: all 0.3s ease-in-out;
  &:hover .sphere-line {
    filter: drop-shadow(2px 4px 6px red);
  }
`;