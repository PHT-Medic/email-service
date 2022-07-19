import { nodemailer } from 'nodemailer';
import * as env from '../../../env';

export async function sendEmail(client: nodemailer.Transport, destinationAddress: string, emailBody: string, emailSubject: string) {
    await client.sendMail({
        from: env.default.smtpMailFrom, // sender address
        to: destinationAddress, // list of receivers
        subject: emailSubject, // Subject line
        text: emailBody, // plain text body
        html: emailBody, // html body
    });
}
