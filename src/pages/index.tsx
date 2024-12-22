import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import '../styles/globals.scss';
import Container from '@/components/Container';
import SphereDisplay from '@/components/sphere/SphereDisplay';
import { StickyButton } from '@/components/NewWindowButton';

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

    // Cleanup
    return () => {
      clearInterval(pollPosition);
      socket.disconnect();
    };
  }, []);

  const openNewWindow = () => {
    window.open(window.location.href, '_blank', 'width=600,height=400');
    console.log(windows);
  };

  return (
    <Container>
      {
        // TODO: Only show the button on the main window first window which was opened
        <StickyButton onClick={openNewWindow}>Open New Window</StickyButton>
      }
      <SphereDisplay windows={windows} position={position} socket={socket} />
    </Container>
  );
}
