import fs from "fs";
import path from "path";
import * as env from "../../../env";
import {sendEmail} from "./send-mail";
import {nodemailer} from 'nodemailer';
import {Proposal, Station} from "@personalhealthtrain/central-common";

export async function proposalStationCreatedMessage(proposal_data: Proposal, response_station: Station, smtpClient: nodemailer.Transport) {
    const title = proposal_data.title;
    const user_name = proposal_data.user;
    const realm_name = proposal_data.realm_id;
    const requested_data = proposal_data.requested_data;
    const risk = proposal_data.risk;
    const risk_comment = proposal_data.risk_comment;
    const proposalID = proposal_data.id;
    const receiver_name = response_station.name;

    const text =`${title} is a new proposal from ${user_name} (${realm_name}). The proposal wants access to the
                following data "${requested_data}". The risk is ${risk} with the assessment "${risk_comment}".
                <br> link <a href="${env.default.proposal_link}${proposalID}">${title}</a> `;

    let emailHTMLText = formatEmailHTMLText(text, receiver_name)
    await send(smtpClient, response_station, emailHTMLText, "Proposal Created")
}

export async function proposalStationDeletedMessage(proposal_data: Proposal, response_station: Station, smtpClient: nodemailer.Transport) {
    const title = proposal_data.title;
    const realm_name = proposal_data.realm_id;
    const receiver_name = response_station.name;

    const text =`The proposal ${title} from ${realm_name} was Deleted.`;

    let emailHTMLText = formatEmailHTMLText(text, receiver_name)
    await send(smtpClient, response_station, emailHTMLText, "Proposal Deleted")
}

function formatEmailHTMLText(text, receiver_name){
    let emailHTMLText = fs.readFileSync(path.join(__dirname, 'email_template.html'), 'utf8');
    emailHTMLText = emailHTMLText.replace('{text}', text)
    emailHTMLText = emailHTMLText.replace(/{receiver_name}/g, receiver_name);
    return emailHTMLText
}
async function send(smtpClient: nodemailer.Transport , response_station: Station, emailHTMLText: string, emailSubject: string) {
    if (response_station.email != null) {
        await sendEmail(smtpClient, response_station.email, emailHTMLText, emailSubject);
    }
}
