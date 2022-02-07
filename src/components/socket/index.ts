import { buildSocketRealmNamespaceName } from '@personalhealthtrain/ui-common';
import { MASTER_REALM_ID } from '@typescript-auth/domains';
import { SocketInterface, useSocketManager } from '../../config/socket';
import { findTokenForRobot } from '../../config/utils';

export function buildSocketComponentHandler() {
    function start() {
        Promise.resolve()
            .then(findTokenForRobot)
            .then((token) => {
                if (!token) {
                    return;
                }

                const manager = useSocketManager();

                const socket: SocketInterface = manager.socket(buildSocketRealmNamespaceName(MASTER_REALM_ID), {
                    auth: {
                        token: token.access_token,
                    },
                });

                socket.on('connect', () => {
                    console.log('connected');
                });

                socket.on('connect_error', (err) => {
                    console.log(err);
                    process.exit(1);
                });

                socket.connect();

                socket.emit('proposalsSubscribe');
                socket.emit('trainsSubscribe');

                socket.on('proposalUpdated', async (proposal) => {
                    console.log(proposal);
                });

                socket.on('trainUpdated', async (train) => {
                    console.log(train);
                });

                socket.connect();
            });
    }

    // --------------------------------------

    return {
        start,
    };
}
