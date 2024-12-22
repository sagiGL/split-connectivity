import { keyframes, styled, css } from "styled-components";

// Function to generate keyframes dynamically
const generateSpinKeyframes = (index: number) => keyframes`
  from { transform: rotateY(${index * 31}deg) rotateX(${index * 31}deg) rotateZ(${index * 31}deg); }
  to { transform: rotateY(${index * 31 + 360}deg) rotateX(${index * 31 + 360}deg) rotateZ(${index * 31 + 360}deg); }
`;

const SphereLineComponent = styled.div<{ color: string; $index: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: 1px solid ${(props) => props.color};
  transition: transform 0.5s ease-in-out;
  ${(props) => css`
    animation: ${generateSpinKeyframes(props.$index)} 8s linear infinite;
  `}
`;

export const SphereLine: React.FC<{ color: string; lines: number }> = ({ color, lines = 3 }) => {
  return (
    <>
      {Array.from({ length: lines }).map((_, idx) => (
        <SphereLineComponent key={idx} color={color} $index={idx + 1} />
      ))}
    </>
  );
};