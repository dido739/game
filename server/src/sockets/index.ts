import { Server, Socket } from 'socket.io';
import { SocketEvent, SocketMessage } from 'shared';
import { verifyToken } from './services/auth';

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

/**
 * Setup Socket.io event handlers
 */
export function setupSocketHandlers(io: Server): void {
  // Authentication middleware for sockets
  io.use((socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (token) {
        const userId = verifyToken(token);
        socket.userId = userId;
      }
      
      next();
    } catch (error) {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`Client connected: ${socket.id}, userId: ${socket.userId}`);

    // Handle lobby creation
    socket.on(SocketEvent.CREATE_LOBBY, async (data) => {
      try {
        // TODO: Implement lobby creation logic
        console.log('Create lobby:', data);
        
        socket.emit(SocketEvent.LOBBY_UPDATED, {
          success: true,
          message: 'Lobby created (placeholder)'
        });
      } catch (error) {
        socket.emit(SocketEvent.ERROR, {
          message: error instanceof Error ? error.message : 'Failed to create lobby'
        });
      }
    });

    // Handle lobby join
    socket.on(SocketEvent.JOIN_LOBBY, async (data) => {
      try {
        // TODO: Implement lobby join logic
        console.log('Join lobby:', data);
        
        const { lobbyCode } = data;
        socket.join(`lobby:${lobbyCode}`);
        
        socket.emit(SocketEvent.LOBBY_UPDATED, {
          success: true,
          message: 'Joined lobby (placeholder)'
        });
      } catch (error) {
        socket.emit(SocketEvent.ERROR, {
          message: error instanceof Error ? error.message : 'Failed to join lobby'
        });
      }
    });

    // Handle card placement
    socket.on(SocketEvent.PLACE_CARD, async (data) => {
      try {
        // TODO: Implement card placement logic
        console.log('Place card:', data);
        
        const { gameId } = data;
        io.to(`game:${gameId}`).emit(SocketEvent.GAME_UPDATED, {
          success: true,
          message: 'Card placed (placeholder)'
        });
      } catch (error) {
        socket.emit(SocketEvent.ERROR, {
          message: error instanceof Error ? error.message : 'Failed to place card'
        });
      }
    });

    // Handle chat messages
    socket.on(SocketEvent.SEND_MESSAGE, async (data) => {
      try {
        const { gameId, message } = data;
        
        io.to(`game:${gameId}`).emit(SocketEvent.RECEIVE_MESSAGE, {
          userId: socket.userId,
          message,
          timestamp: new Date()
        });
      } catch (error) {
        socket.emit(SocketEvent.ERROR, {
          message: error instanceof Error ? error.message : 'Failed to send message'
        });
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
      
      // TODO: Handle player disconnection in active games
      // - Notify other players
      // - Pause game or enable AI takeover
      // - Store state for reconnection
    });
  });
}
