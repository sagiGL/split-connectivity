const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

let windows = [];

function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function isPositionAlmostSame(pos1, pos2) {
  const threshold = 10; // Adjust the threshold as needed
  return (
    Math.abs(pos1.x - pos2.x) < threshold &&
    Math.abs(pos1.y - pos2.y) < threshold &&
    Math.abs(pos1.width - pos2.width) < threshold &&
    Math.abs(pos1.height - pos2.height) < threshold
  );
}

io.on("connection", (socket) => {
  console.log("A new window connected:", socket.id);

  // Register a new window
  socket.on("register", ({ position, id, color }) => {
    let existingWindow = windows.find((w) => w.id === id && isPositionAlmostSame(w.position, position));
    if (existingWindow) {
      console.log("Window reconnected:", socket.id);
      socket.id = existingWindow.id;
      existingWindow.position = position;
    } else {
      console.log("New window connected:", socket.id);
      const newColor = color || generateRandomColor();
      windows.push({ id: socket.id, position, color: newColor });
      if (id) {
        socket.emit("store-window-data", { id: socket.id, color: newColor });
      }
    }
    io.emit("update-windows", windows); // Broadcast to all windows
  });

  // Update window position
  socket.on("update-position", (position) => {
    windows = windows.map((w) =>
      w.id === socket.id ? { ...w, position } : w
    );
    io.emit("update-windows", windows); // Broadcast to all windows
  });

  // Handle window disconnect
  socket.on("disconnect", () => {
    console.log("Window disconnected:", socket.id);
    const disconnectTimeout = setTimeout(() => {
      windows = windows.filter((w) => w.id !== socket.id);
      io.emit("update-windows", windows); // Broadcast to all windows
    }, 100);

    socket.on("reconnect", () => {
      clearTimeout(disconnectTimeout);
    });
  });
});

console.log("Socket.IO server running on port 3001");