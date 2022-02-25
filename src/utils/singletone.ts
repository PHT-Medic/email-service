import { useClient } from '@trapi/client';
import { HTTPClient } from '@personalhealthtrain/central-common';

export function useCentralAPI() : HTTPClient {
    const client = useClient<HTTPClient>();

    return client;
}
