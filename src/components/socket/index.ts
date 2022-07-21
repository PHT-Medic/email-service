import { SocketInterface, useSocketManager } from '../../config/socket';
import * as env from '../../env'
import { findTokenForRobot } from '../../config/utils';
import { createTestSocketComponentHandler } from './domains/test';
import { ProposalStationSocketComponentHandler } from './domains/proposal-station';
import {TrainStationSocketComponentHandler} from "./domains/train-listeners";
import {sendEmail} from "./domains/send-mail";





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

                // create the smtp client
                const nodemailer = require("nodemailer");
                const smtpClient = nodemailer.createTransport({
                    host: env.default.smtpHost,
                    port: env.default.smtpPort,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: env.default.smtpUser, // generated ethereal user
                        pass: env.default.smtpPassword, // generated ethereal password
                    },
                });
                smtpClient.verify(function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("email Server is ready to take our messages");
                    }
                    if (success) {
                        console.log(success);
                    } else {
                        console.log("Server is not ready to take our messages, look at the smtp configurations and try again");
                    }
                });
                // test for smtp client remove this lines later
                let Text = "this is a test text";
                let emailSubject = "this is a test subject";
                let receiver_name = "Jhon Doe";
                sendEmail(smtpClient, "david.hieber@uni-tuebingen.de", Text, receiver_name, emailSubject).then(r =>
                    console.log(r));
                // end of test


                console.log('socket connected');
                //createProposalSocketComponentHandler(socket);
                createTestSocketComponentHandler(socket);
                ProposalStationSocketComponentHandler(socket, smtpClient);
                TrainStationSocketComponentHandler(socket, smtpClient);

                // todo: add additional domain handlers

                socket.connect();
            });
    }

    // --------------------------------------

    return {
        start,
    };
}
