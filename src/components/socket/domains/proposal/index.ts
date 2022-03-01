import { SocketInterface } from '../../../../config/socket';
import { handleProposalUpdated } from './update-handler';

export function createProposalSocketComponentHandler(socket: SocketInterface) {
    socket.emit('proposalsSubscribe');

    // 1 pro Proposal
    socket.on('proposalCreated', async (proposal) => {
        console.log(`created proposal ${proposal.data.title}`);
        console.dir(proposal.data);
    });

    // x pro Proposal
    socket.on('proposalUpdated', async (proposal) => {
        handleProposalUpdated(proposal.data);
    });

    // 1 pro Proposal
    socket.on('proposalDeleted', async (proposal) => {
        console.log(`deleted proposal ${proposal.data.title}`);
        console.dir(proposal.data);
    });
}
