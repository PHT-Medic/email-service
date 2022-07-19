import { nodemailer } from 'nodemailer';
import { SocketInterface } from '../../../config/socket';

export function TrainStationSocketComponentHandler(socket: SocketInterface, smtpClient: nodemailer.Transport) {
    socket.emit('trainSubscribe');

    socket.on('trainCreated', async (proposal) => {
        console.log('trainCreated');
        console.dir(proposal.data);
    });

    socket.on('trainUpdated', async (proposal) => {
        console.log('trainUpdated');
        console.dir(proposal.data);
    });

    socket.on('trainDeleted', async (proposal) => {
        console.log('trainDeleted');
        console.dir(proposal.data);
    });
}
