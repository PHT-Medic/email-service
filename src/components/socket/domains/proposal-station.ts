import { nodemailer } from 'nodemailer';
import { SocketInterface } from '../../../config/socket';
import { useCentralAPI } from '../../../utils';
import { proposalStationCreatedMessage, proposalStationDeletedMessage } from './compose-messages';

export function ProposalStationSocketComponentHandler(socket: SocketInterface, smtpClient: nodemailer.Transport) {
    socket.emit('proposalStationSubscribe');

    // 1 pro Proposal
    socket.on('proposalStationCreated', async (proposal) => {
        const api = await useCentralAPI();

        const proposal_data = await api.proposal.getMany({
            filter: {
                id: proposal.data.proposal_id,
            },
            fields: ['+user'],
        });

        const response_station = await api.station.getMany({
            filter: {
                id: proposal.data.station_id,
            },
            fields: ['+email'],
        });

        await proposalStationCreatedMessage(proposal_data.data[0], response_station.data[0], smtpClient);
    });

    // x pro Proposal
    socket.on('proposalStationUpdated', async (proposal) => {
        console.log('updated proposal-station');
        console.dir(proposal.data);
    });

    // 1 pro Proposal
    socket.on('proposalStationDeleted', async (proposal) => {
        console.log('Deleted proposal-station');
        console.dir(proposal.data);
        const api = await useCentralAPI();

        const proposal_data = await api.proposal.getMany({
            filter: {
                id: proposal.data.proposal_id,
            },
            fields: ['+user'],
        });

        const response_station = await api.station.getMany({
            filter: {
                id: proposal.data.station_id,
            },
            fields: ['+email'],
        });

        await proposalStationDeletedMessage(proposal_data.data[0], response_station.data[0], smtpClient);
    });
}
