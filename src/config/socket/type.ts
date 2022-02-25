import { ManagerOptions, Socket } from 'socket.io-client';
import { SocketClientToServerEvents, SocketServerToClientEvents } from '@personalhealthtrain/central-common';

export type ClientOptions = {
    url: string,
    managerOptions: Partial<ManagerOptions>
};

export type SocketInterface = Socket<SocketServerToClientEvents, SocketClientToServerEvents>;
