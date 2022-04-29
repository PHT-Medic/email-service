import { SocketInterface, useSocketManager } from '../../config/socket';
import * as env from '../../env'
import { findTokenForRobot } from '../../config/utils';
import { createTestSocketComponentHandler } from './domains/test';
import { ProposalStationSocketComponentHandler } from './domains/proposal-station';
import {SMTPClient} from "smtp-client";
import {TrainStationSocketComponentHandler} from "./domains/train-listeners";




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



                //createProposalSocketComponentHandler(socket);
                createTestSocketComponentHandler(socket);
                ProposalStationSocketComponentHandler(socket, smtpClient);
                TrainStationSocketComponentHandler(socket, SMTPClient);
                // todo: add additional domain handlers

                socket.connect();
            });
    }

    // --------------------------------------

    return {
        start,
    };
}
