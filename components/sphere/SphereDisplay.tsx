import React from 'react';
import { Position, WindowData } from '../../types/Windows.type';
import Sphere from './Sphere';

interface ISphereDisplay {
  windows: WindowData[];
  position: Position;
  socket: any;
}

const SphereDisplay: React.FC<ISphereDisplay> = ({
  windows,
  position,
  socket,
}) => {
  const myWindow: WindowData = windows.find((win) => win.id === socket?.id) || {
    id: '',
    position: { x: 0, y: 0, width: 0, height: 0 },
    color: '',
  };
  const otherWindows = windows.filter((win) => win.id !== socket?.id);

  const calculateDirection = (from: Position, to: Position): number => {
    const dx = to.x + to.width / 2 - (from.x + from.width / 2);
    const dy = to.y + to.height / 2 - (from.y + from.height / 2);
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  const calculateDistance = (from: Position, to: Position): number => {
    const dx = to.x + to.width / 2 - (from.x + from.width / 2);
    const dy = to.y + to.height / 2 - (from.y + from.height / 2);
    return Math.sqrt(dx * dx + dy * dy);
  };

  const isOverlapping = (win1: Position, win2: Position): boolean => {
    const xOverlap =
      win1.x < win2.x + win2.width && win1.x + win1.width > win2.x;
    const yOverlap =
      win1.y < win2.y + win2.height && win1.y + win1.height > win2.y;
    return xOverlap && yOverlap;
  };

  return (
    <>
      <Sphere
        position={myWindow.position}
        color={myWindow.color}
        lines={3}
        links={otherWindows.map((win) => {
          const direction = calculateDirection(position, win.position);
          const distance = calculateDistance(position, win.position);

          return {
            id: `${position.x}-${position.y}-${win.position.x}-${win.position.y}`,
            length: distance,
            angle: direction,
            colors: [myWindow.color, win.color],
          };
        })}
      />
      {/* {otherWindows.map((win) => (
        <>
          {isOverlapping(win.position, myWindow.position) && (
            <Sphere
              position={win.position}
              color={win.color}
              lines={3}
            ></Sphere>
          )}
        </>
      ))} */}
    </>
  );
};

export default SphereDisplay;
