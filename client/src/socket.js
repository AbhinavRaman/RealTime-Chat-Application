import { io } from 'socket.io-client';

const ENDPOINT = "http://localhost:5000"; // Backend server

const socket = io(ENDPOINT, {
    transports: ['websocket'],
});

export default socket;