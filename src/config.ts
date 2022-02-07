import { setConfig as setHTTPConfig, useClient, useClient as useHTTPClient } from '@trapi/client';
import {
    VaultAPI,
} from '@personalhealthtrain/ui-common';
import https from 'https';
import { ErrorCode } from '@typescript-auth/domains';
import { Environment } from './env';
import { useSocketManager } from './config/socket';
import { buildSocketComponentHandler } from './components/socket';
import { findTokenForRobot } from './config/utils';

interface ConfigContext {
    env: Environment
}

export type Config = {
    components: {start: () => void}[]
};

function createConfig({ env } : ConfigContext) : Config {
    setHTTPConfig({
        clazz: VaultAPI,
        driver: {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        },
        extra: {
            connectionString: env.vaultConnectionString,
        },
    }, 'vault');

    setHTTPConfig({
        driver: {
            baseURL: env.apiUrl,
            withCredentials: true,
        },
    });

    useHTTPClient().mountResponseInterceptor(
        (value) => value,
        async (err) => {
            const { config } = err;

            if (
                err.response && (
                    err.response.status === 401 || // Unauthorized
                    err.response.status === 403 || // Forbidden
                    err.response.data?.code === ErrorCode.CREDENTIALS_INVALID ||
                    err.response.data?.code === ErrorCode.TOKEN_EXPIRED
                )
            ) {
                const token = await findTokenForRobot();
                if (token) {
                    useClient().setAuthorizationHeader({
                        type: 'Bearer',
                        token: token.access_token,
                    });

                    return useClient().request(config);
                }

                useClient().unsetAuthorizationHeader();
            }

            return Promise.reject(err);
        },
    );

    // --------------------------------------------

    useSocketManager({
        url: env.webUrl,
        managerOptions: {
            autoConnect: false,
        },
    });

    // --------------------------------------------

    const components : {start: () => void}[] = [
        buildSocketComponentHandler(),
    ];

    return {
        components,
    };
}

export default createConfig;
