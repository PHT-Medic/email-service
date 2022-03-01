import { config } from 'dotenv';
import path from 'path';



const envResult = config({
    path: path.resolve(__dirname, '../.env'),
});

if (envResult.error) {
    // eslint-disable-next-line no-console
    console.error(`[ERROR] env failed to load:${envResult.error}`);
    process.exit(1);
}

export function requireFromEnv(key : string, alt?: any) {
    if (!process.env[key] && typeof alt === 'undefined') {
        // eslint-disable-next-line no-console
        console.error(`[APP ERROR] Missing env variable:${key}`);

        return process.exit(1);
    }

    return process.env[key] ?? alt;
}

export interface Environment {
    env: string,

    vaultConnectionString: string,

    apiUrl: string,
    webUrl: string,

    smtpUser: string,
    smtpPassword: string,
    smtpMailFrom: string,
    smtpHost: string,
    smtpPort: number,

    proposal_link: String,
    train_link
}

const env : Environment = {
    env: requireFromEnv('NODE_ENV'),

    vaultConnectionString: requireFromEnv('VAULT_CONNECTION_STRING'),

    apiUrl: requireFromEnv('API_URL'),
    webUrl: requireFromEnv('WEB_URL'),

    smtpUser: requireFromEnv('SMTP_USER'),
    smtpPassword: requireFromEnv('SMTP_PASSWORD'),
    smtpMailFrom: requireFromEnv('SMTP_MAIL_FROM'),
    smtpHost: requireFromEnv('SMTP_HOST'),
    smtpPort: requireFromEnv('SMTP_PORT', 587),

    proposal_link: requireFromEnv('PROPOSAL_LINK', "https://staging-pht.tada5hi.net/proposals/"),
    train_link: requireFromEnv('TRAIN_LINK',"https://staging-pht.tada5hi.net/trains/"),
    //self.proposal_link =   "https://pht.tada5hi.net/proposals/"
    //self.train_link = "https://pht.tada5hi.net/trains/"
};

export default env;
