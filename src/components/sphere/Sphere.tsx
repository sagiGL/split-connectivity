import { Position } from '@/types/Windows.type';
import React, { useCallback } from 'react';
import { Link } from './Link';
import { SphereWrapper } from './SphereWrapper';
import { SphereLine } from './SphereLine';

interface ILinkData {
  id: string;
  length: number;
  angle: number;
  colors: string[];
}

interface ISphere {
  position: Position;
  links?: ILinkData[];
  color: string;
  size?: string;
  lines?: number;
}

const Sphere: React.FC<ISphere> = ({
  position,
  links,
  color,
  size = '20%',
  lines = 6,
}) => {
  const renderSphereLines = useCallback((color: string, lines: number) => {
    return Array.from({ length: lines }).map((_, idx) => (
      <SphereLine key={idx} color={color} lines={lines} />
    ));
  }, []);

  const isAbove = (pos1: Position, pos2: Position) => {
    return pos1.y < pos2.y;
  };

  return (
    <SphereWrapper position={position} color={color} size={size}>
      {renderSphereLines(color, lines)}
      {links?.map((link, idx) => (
        <React.Fragment key={idx}>
          <Link
            length={link.length + 'px'}
            angle={link.angle}
            colors={link.colors}
          />
          <SphereWrapper
            position={position}
            color={link.colors[1]}
            size={`${100 - (link.length - 20) / 10}%`}
          >
            {renderSphereLines(link.colors[1], lines)}
          </SphereWrapper>
          {isAbove(position, {
            x: position.x + link.length,
            y: position.y + link.angle,
            width: position.width,
            height: position.height,
          }) && (
            <SphereWrapper
              position={{
                x: position.x + link.length,
                y: position.y + link.angle,
                width: position.width,
                height: position.height,
              }}
              color={link.colors[1]}
              size="10%"
            >
              {renderSphereLines(link.colors[1], lines)}
            </SphereWrapper>
          )}
        </React.Fragment>
      ))}
    </SphereWrapper>
  );
};

export default React.memo(Sphere);
