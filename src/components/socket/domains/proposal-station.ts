import fs from 'fs';
import path  from 'path'
import { SocketInterface } from '../../../config/socket';
import { useCentralAPI } from '../../../utils';
import {nodemailer} from 'nodemailer';
import {sendEmail} from "./send-mail";
import * as env from '../../../env'


export function createProposalStationSocketComponentHandler(socket: SocketInterface, smtpClient:  nodemailer.Transport) {
    socket.emit('proposalStationsSubscribe');

    // 1 pro Proposal
    socket.on('proposalStationCreated', async (proposal) => {
        const api = await useCentralAPI();

        const proposal_data = await api.proposal.getMany({
            filter: {
                id: proposal.data.proposal_id
            },
            fields: ['+user']
        });

        console.log(proposal_data.data[0])

        const response_station = await api.station.getMany({
            filter: {
                id: proposal.data.station_id,
            },
            fields: ['+secure_id', '+email'],
        });
        console.log(response_station.data[0]);
        console.log(response_station.data[0].email);

        const title = proposal_data.data[0].title;
        const user_name = proposal_data.data[0].user;
        const realm_name = proposal_data.data[0].realm_id;
        const requested_data = proposal_data.data[0].requested_data;
        const risk =  proposal_data.data[0].risk;
        const risk_comment = proposal_data.data[0].risk_comment;
        const proposalID = proposal_data.data[0].id;
        const receiver_name = response_station.data[0].name;

        let emailTemplate = fs.readFileSync(path.join(__dirname, 'email_template.html'),'utf8');
        const text = `${title} is a new proposal from ${user_name} (${realm_name}). The proposal wants access to the following data "${requested_data}". The risk is ${risk} with the assessment "${risk_comment}".  <br> link <a href="${env.default.proposal_link}${proposalID}">${title}</a> `
        emailTemplate = emailTemplate.replace('{text}', text )
        emailTemplate = emailTemplate.replace(/{receiver_name}/g, receiver_name);
        if (response_station.data[0].email != null){
            await sendEmail(smtpClient, response_station.data[0].email, emailTemplate, "Proposal Created");
        }
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
