import { Position } from '../../types/Windows.type';
import React, { useCallback } from 'react';
import { ILinkData, Link } from './Link';
import { SphereWrapper } from './SphereWrapper';
import { SphereLine } from './SphereLine';

interface ISphere {
  position: Position;
  links?: ILinkData[];
  color: string;
  size?: number;
  lines?: number;
}

const Sphere: React.FC<ISphere> = ({
  position,
  links,
  color,
  size = 50,
  lines = 6,
}) => {
  const renderSphereLines = useCallback((color: string, lines: number) => {
    return Array.from({ length: lines }).map((_, idx) => (
      <SphereLine key={idx} color={color} lines={lines} />
    ));
  }, []);

  return (
    <SphereWrapper position={position} color={color} size={size}>
      {renderSphereLines(color, lines)}
      {links?.map((link, idx) => (
        <React.Fragment key={idx}>
          <Link
            length={link.length}
            angle={link.angle}
            colors={link.colors}
            sphereSize={link.sphereSize}
          />
          <SphereWrapper
            position={position}
            color={link.colors[1]}
            size={100 - (link.length - 20) / 10}
          >
            {renderSphereLines(link.colors[1], lines)}
          </SphereWrapper>
        </React.Fragment>
      ))}
    </SphereWrapper>
  );
};

export default React.memo(Sphere);
