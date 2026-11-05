import { io } from 'socket.io-client';

export const socket = io('http://192.168.1.6:3001', {
  autoConnect: true,
  reconnection: true
});
