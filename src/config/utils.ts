import { OAuth2TokenGrant, OAuth2TokenResponse, TokenAPI } from '@typescript-auth/domains';
import { ROBOT_SECRET_ENGINE_KEY, ServiceID } from '@personalhealthtrain/central-common';
import { useClient } from '@trapi/client';
import { VaultClient } from '@trapi/vault-client';

export async function findTokenForRobot() : Promise<OAuth2TokenResponse | undefined> {
    const response = await useClient<VaultClient>('vault').keyValue
        .find(ROBOT_SECRET_ENGINE_KEY, ServiceID.SYSTEM);

    if (response) {
        const tokenApi = new TokenAPI(useClient().driver);

        return tokenApi.create({
            id: response.data.id,
            secret: response.data.secret,
            grant_type: OAuth2TokenGrant.ROBOT_CREDENTIALS,
        });
    }

    return undefined;
}
