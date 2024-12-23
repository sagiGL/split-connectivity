import { useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import '../styles/globals.scss';
import Container from '../components/Container';
import SphereDisplay from '../components/sphere/SphereDisplay';
import { StickyButton } from '../components/NewWindowButton';

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WindowData {
  id: string;
  position: Position;
  color: string;
}

const socket: Socket = io('http://localhost:3001');

export default function Home() {
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const initialPosition: Position = {
      x: window.screenX,
      y: window.screenY,
      width: window.innerWidth,
      height: window.innerHeight,
    };
    setPosition(initialPosition);

    const storedId = localStorage.getItem('windowId');
    const storedColor = localStorage.getItem('windowColor');

    socket.emit('register', {
      position: initialPosition,
      id: storedId,
      color: storedColor,
    });

    // Listen for updates from the server
    socket.on('update-windows', (updatedWindows: WindowData[]) => {
      setWindows(updatedWindows);
    });

    socket.on('store-window-data', ({ id, color }) => {
      localStorage.setItem('windowId', id);
      localStorage.setItem('windowColor', color);
    });

    // Poll for position changes
    let lastPosition = initialPosition;
    const pollPosition = setInterval(() => {
      const currentPosition: Position = {
        x: window.screenX,
        y: window.screenY,
        width: window.innerWidth,
        height: window.innerHeight,
      };
      if (
        currentPosition.x !== lastPosition.x ||
        currentPosition.y !== lastPosition.y
      ) {
        setPosition(currentPosition);
        socket.emit('update-position', currentPosition);
        lastPosition = currentPosition;
      }
    }, 100);

    // Move the window around the screen
    let x = window.screenX;
    let y = window.screenY;
    let directionX = 1;
    let directionY = 1;
    const step = 500;
    const moveInterval = 1000; // Move every 100ms

    const moveWindow = () => {
      const screenWidth = window.screen.availWidth;
      const screenHeight = window.screen.availHeight;

      x += step * directionX;
      y += step * directionY;

      if (x <= 0 || x + window.outerWidth >= screenWidth) {
        directionX *= -1;
      }
      if (y <= 0 || y + window.outerHeight >= screenHeight) {
        directionY *= -1;
      }

      window.moveTo(x, y);
    };

    let moveWindowInterval: NodeJS.Timeout | null = null;
    if (isMoving) {
      moveWindowInterval = setInterval(moveWindow, moveInterval);
    }

    // Cleanup
    return () => {
      clearInterval(pollPosition);
      if (moveWindowInterval) {
        clearInterval(moveWindowInterval);
      }
      socket.disconnect();
    };
  }, []);

  const openNewWindow = () => {
    window.open(window.location.href, '_blank', 'width=600,height=400');
  };
  const toggleMovement = () => {
    setIsMoving((prev) => !prev);
  };

  return (
    <Container>
      <StickyButton onClick={openNewWindow}>Open New Window</StickyButton>
      {/* <StickyButton onClick={toggleMovement}>
        {isMoving ? 'Stop Moving' : 'Start Moving'}
      </StickyButton> */}
      <SphereDisplay windows={windows} position={position} socket={socket} />
    </Container>
  );
}
