import { Proposal } from '@personalhealthtrain/central-common';

const cachedItems : Proposal[] = [];

export function getProposalCacheItem(id: Proposal['id']) : Proposal | undefined {
    const index = cachedItems.findIndex((item) => item.id === id);
    if (index !== -1) {
        return cachedItems[index];
    }

    return undefined;
}

export function setProposalCacheItem(data: Proposal) {
    const index = cachedItems.findIndex((item) => item.id === data.id);
    if (index === -1) {
        cachedItems.push(data);
    } else {
        cachedItems[index] = data;
    }
}

export function unsetProposalCacheItem(id: Proposal['id']) {
    const index = cachedItems.findIndex((item) => item.id === id);
    if (index !== -1) {
        cachedItems.splice(index, 1);
    }
}
