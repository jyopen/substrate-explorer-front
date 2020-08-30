import {decodeAddress, encodeAddress} from '@polkadot/keyring';

export function formatAddress(address: string | Uint8Array): string {
    try {
        if (typeof address === 'string' && address.length === 64) {
            return encodeAddress(decodeAddress(`0x${address}`));
        }
        return encodeAddress(decodeAddress(address));
    } catch (e) {
        return 'Unknown Address';
    }
}

