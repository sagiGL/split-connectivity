// components/SphereDisplay.tsx
import React from "react";
import { Sphere } from "./Sphere";
import { Position, WindowData } from "@/types/Windows.type";

interface ISphereDisplay {
  windows: WindowData[];
  position: Position;
  socket: any;
}

const SphereDisplay: React.FC<ISphereDisplay> = ({ windows, position, socket }) => {
  const myWidow: WindowData = windows.find((win) => win.id === socket?.id) 
  || { id: '', position: { x: 0, y: 0, width: 0, height: 0 }, color: '' };
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


  return (
    <>
     <Sphere
              position={myWidow.position}
              color={myWidow.color}
              links={otherWindows.map((win, id) => {
                  const direction = calculateDirection(position, win.position);
                  const distance = calculateDistance(position, win.position);
        
                  return {
                    id: position.x+position.y+win.position.x+win.position.y,
                    length: `${distance}px`,
                    angle: direction,
                    colors: [myWidow.color, win.color]
                  };
                })}
      />
    </>
  );

  return (
    <>
      {windows
        .filter((win) => win.id !== socket?.id) // Exclude self
        .map((win, id) => {
          const direction = calculateDirection(position, win.position);
          const distance = calculateDistance(position, win.position);

          return (
            <Sphere
              key={id}
              position={win.position}
              color={win.color}
              links={[{
                length: `${distance}px`,
                angle: direction
              }]}
            />
          );
        })}
    </>
  );
};

export default SphereDisplay;
