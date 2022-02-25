import { SocketInterface } from '../../../config/socket';
import { useCentralAPI } from '../../../utils';

export function createProposalStationSocketComponentHandler(socket: SocketInterface) {
    socket.emit('proposalStationsSubscribe');

    // 1 pro Proposal
    socket.on('proposalStationCreated', async (proposal) => {
        console.log('created proposal-station ');
        console.dir(proposal.data);

        const api = await useCentralAPI();
        const response = await api.station.getMany({
            filter: {
                id: proposal.data.station_id,
            },
            fields: ['+secure_id', '+email'],
        });

        console.log(response.meta); // {total: 1, offset: 0, limit: 10}
        console.log(response.data); // [{}]
    });

    // x pro Proposal
    socket.on('proposalStationUpdated', async (proposal) => {
        console.log('updated proposal-station');
        console.dir(proposal.data);
    });

    // 1 pro Proposal
    socket.on('proposalStationDeleted', async (proposal) => {
        console.log('deleted proposal-station');
        console.dir(proposal.data);
    });
}
