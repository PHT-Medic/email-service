import { Proposal } from '@personalhealthtrain/central-common';
import { getProposalCacheItem, setProposalCacheItem } from './cache';

export function handleProposalUpdated(proposal: Proposal) {
    const cache = getProposalCacheItem(proposal.id);
    if (cache) {
        // match
        console.log('cache hit');
        if (cache.title === proposal.title) {
            console.log('title did not change...');
        } else {
            console.log('title did change ...');
        }
    } else {
        // no match
        console.log('cache miss');
    }

    setProposalCacheItem(proposal);
}
