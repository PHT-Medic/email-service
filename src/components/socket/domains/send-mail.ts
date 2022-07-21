import { nodemailer } from 'nodemailer';
import * as env from '../../../env';
import fs from "fs";

export async function sendEmail(client: nodemailer.Transport, destinationAddress: string, Text: string, receiver_name: string, emailSubject: string) {
    // create the email HTML body from the template
    let emailBodyHTML = fs.readFileSync("./src/components/socket/domains/email_template.html", "utf8");
    emailBodyHTML = emailBodyHTML.replace(/{{receiver_name}}/g, receiver_name );
    emailBodyHTML = emailBodyHTML.replace(/{{text}}/g, Text);
    // create the email plain text body from the template
    let emailBodyPlain = fs.readFileSync("./src/components/socket/domains/email_template.txt", "utf8");
    emailBodyPlain = emailBodyPlain.replace(/{{receiver_name}}/g, receiver_name );
    emailBodyPlain = emailBodyPlain.replace(/{{text}}/g, Text);
    // send the email
    await client.sendMail({
        from: env.default.smtpMailFrom, // sender address
        to: destinationAddress, // list of receivers
        subject: emailSubject, // Subject line
        text: emailBodyPlain, // plain text body
        html: emailBodyHTML, // html body
    });
}
