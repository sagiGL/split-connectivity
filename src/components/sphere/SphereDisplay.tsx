import React from "react";
import { Position, WindowData } from "@/types/Windows.type";
import Sphere from "./Sphere";

interface ISphereDisplay {
  windows: WindowData[];
  position: Position;
  socket: any;
}

const SphereDisplay: React.FC<ISphereDisplay> = ({ windows, position, socket }) => {
  const myWindow: WindowData =
    windows.find((win) => win.id === socket?.id) ||
    { id: "", position: { x: 0, y: 0, width: 0, height: 0 }, color: "" };
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
        position={myWindow.position}
        color={myWindow.color}
        lines={3}
        links={otherWindows.map((win) => {
          const direction = calculateDirection(position, win.position);
          const distance = calculateDistance(position, win.position);

          return {
            id: `${position.x}-${position.y}-${win.position.x}-${win.position.y}`, // Convert to string
            length: distance,
            angle: direction,
            colors: [myWindow.color, win.color],
          };
        })}
      />
    </>
  );
};

export default SphereDisplay;
