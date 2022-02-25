import { SocketInterface, useSocketManager } from '../../config/socket';
import { findTokenForRobot } from '../../config/utils';

import { createProposalSocketComponentHandler } from './domains/proposal';
import { createTestSocketComponentHandler } from './domains/test';
import { createProposalStationSocketComponentHandler } from './domains/proposal-station';

export function buildSocketComponentHandler() {
    function start() {
        Promise.resolve()
            .then(findTokenForRobot)
            .then((token) => {
                if (!token) {
                    return;
                }

                const manager = useSocketManager();

                const socket: SocketInterface = manager.socket('/', {
                    auth: {
                        token: token.access_token,
                    },
                });

                createProposalSocketComponentHandler(socket);
                createTestSocketComponentHandler(socket);
                createProposalStationSocketComponentHandler(socket);
                // todo: add additional domain handlers

                socket.connect();
            });
    }

    // --------------------------------------

    return {
        start,
    };
}
