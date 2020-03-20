import DEC from 'decimal.js';


export function formatNumber(balance: string | number, decimal = 12, fixed?: number) {
    return new DEC(balance || '0').div(new DEC(10).pow(new DEC(decimal))).toFixed(fixed);
}

export function toThousands(num: string | number, fix = 3) {
    const s = String(num) || '0';
    let [z, p] = s.split('.');
    p = p ? p.substr(0, fix) : '';
    const strs = [];
    for (let i = z.length; i > 0; i -= 3) {
        const start = i - 3;
        const items = z.slice(start > 0 ? start : 0, i);
        strs.push(items);
    }
    return (
        (z.includes('-') ? '-' : '') + strs.reverse().join(',') + (p ? '.' + p : '')
    );
}

export function formatBalance(balance: string | number, decimal = 12) {
    const fixed = Math.min(3, decimal);
    return toThousands(formatNumber(balance, decimal), fixed);
}


export function formatFriendlyTime(time: number, endTime = Date.now()) {
    time = endTime - time;
    time = time / 1000;
    if (time < 0) {
        return `0 seconds ago`;
    }
    if (time < 60) {
        return `${time.toFixed(0)} seconds ago`;
    }
    time = time / 60;
    if (time < 60) {
        return `${time.toFixed(0)} minute ago`;
    }
    time = time / 60;
    if (time < 24) {
        return `${time.toFixed(0)} hours ago`;
    }
    time = time / 24;
    if (time < 30) {
        return `${time.toFixed(0)} days ago`;
    }
    time = time / 30;
    if (time < 365) {
        return `${time.toFixed(0)} months ago`;
    }
    time = time / 365;
    return `${time.toFixed(0)} years ago`;
}

export function formatSize(size: number) {
    if (size < 1024) {
        return `${size.toFixed(0)} bytes`;
    }
    size = size / 1024;
    if (size < 1024) {
        return `${size.toFixed(0)} KB`;
    }
    size = size / 1024;
    if (size < 1024) {
        return `${size.toFixed(0)} MB`;
    }
    size = size / 1024;
    if (size < 1024) {
        return `${size.toFixed(0)} GB`;
    }
    size = size / 1024;
    return `${size.toFixed(0)} TB`;
}

export function formatType(type: string) {
    if (['Address', 'AccountId', 'AccountIdOf', 'SessionKey', 'LookupSource',
        'ValidatorId', 'AuthorityId', '<Lookup as StaticLookup>::Source'].includes(type)) {
        return 'address';
    }
    if ([
        'AccountIndex',
        'AssetId',
        'BlockNumber',
        'Gas',
        'Index',
        'Nonce',
        'ParaId',
        'ProposalIndex',
        'PropIndex',
        'ReferendumIndex',
        'i8',
        'i16',
        'i32',
        'i64',
        'i128',
        'u8',
        'u16',
        'u32',
        'u64',
        'u128',
        'u256',
        'VoteIndex',
    ].includes(type)) {
        return 'number';
    }
    if (['Amount', 'AssetOf', 'Balance', 'BalanceOf', 'Compact<Balance>'].includes(type)) {
        return 'balance';
    }
    return type;
}
