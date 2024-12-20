// components/sphere.tsx
import { Position } from "@/types/Windows.type";
import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for the spinning animations
const spin1 = keyframes`
  from { transform: rotateY(0deg) rotateX(0deg); }
  to { transform: rotateY(360deg) rotateX(360deg); }
`;

const spin2 = keyframes`
  from { transform: rotateY(60deg) rotateZ(60deg); }
  to { transform: rotateY(420deg) rotateZ(420deg); }
`;

const spin3 = keyframes`
  from { transform: rotateY(120deg) rotateZ(120deg); }
  to { transform: rotateY(480deg) rotateZ(480deg); }
`;

// Wrapper for the sphere, centered in the window
export const SphereWrapper = styled.div<{ position: { x: number; y: number; width: number; height: number } }>`
  position: fixed; /* Position fixed for centering relative to the viewport */
  top: 50%;
  left: 50%;
  width: 20%;
  /* height: 20%; */
  aspect-ratio: 1/1;
  transform: translate(-50%, -50%); /* Center the sphere */
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  border-radius: 50%;
  border: 4px solid ${(props) => props.color};
  filter: blur(px);
  &:hover .sphere-line {
    filter: drop-shadow(2px 4px 6px red);
  }
`;

// Lines around the sphere
export const SphereLine = styled.div<{ color: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: 2px solid ${(props) => props.color};
  transition: ease-in-out 0.5s;

  &.d-1 {
    animation: ${spin1} 8s linear infinite;
  }

  &.d-2 {
    animation: ${spin2} 8s linear infinite;
  }

  &.d-3 {
    animation: ${spin3} 8s linear infinite;
  }
`;

// Styled component for the smaller sphere
const SmallSphere = styled.div<{ color: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px; // Adjust size as needed
  height: 20px; // Adjust size as needed
  background-color: ${(props) => props.color};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

// Styled component for the link
export const Link = styled.div<{ length: string; angle: number, colors: string[] }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: rotate(${(props) => props.angle}deg);
  transform-origin: left center;
  width: ${(props) => props.length};
  height: 5px;
  background-image: linear-gradient(to right, ${(props) => props.colors[0]}, ${(props) => props.colors[1]});
  z-index: 1;
`;


interface ILinkData {
  id: string;
  length: string;
  angle: number;
  colors: string[];
}

interface ISphere {
  position: Position;
  links: ILinkData[];
  color: string;
}

export const Sphere: React.FC<ISphere> = ({ position, links, color }) => {
  return (
    <>
    <SphereWrapper position={position} color={color}>
      {/* Render the sphere lines */}
      <SphereLine className="d-1"  color={color}/>
      <SphereLine className="d-2"  color={color}/>
      <SphereLine className="d-3"  color={color}/>

      {/* Render links to other spheres */}
      {links.map((link, idx) => (
        <React.Fragment key={idx}>
          <Link length={link.length} angle={link.angle} colors={link.colors}/>
          <SmallSphere color={link.colors[1]} />
        </React.Fragment>
      ))}
    </SphereWrapper>
    </>
  );
};

export default Sphere;
