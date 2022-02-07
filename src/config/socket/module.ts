import { Manager } from 'socket.io-client';
import { ClientOptions } from './type';

let instance : Manager | undefined;

export function useSocketManager(options?: ClientOptions) {
    if (typeof instance !== 'undefined') {
        return instance;
    }

    if (typeof options === 'undefined') {
        throw new Error('Socket manager options must be set.');
    }

    instance = new Manager(options.url, options.managerOptions);

    return instance;
}
