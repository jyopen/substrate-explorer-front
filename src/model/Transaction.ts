
export default class Transaction {
    public id!: string;
    public blockNumber!: number;
    public section!: string;
    public method!: string;
    public indexes!: number;
    public eventCount!: number;
    public timestamp!: number;
    public tip!: string;
    public nonce!: number | null;
    public isSigned!: boolean;
    public signature!: string;
    public args!: string;
    public hash!: string;
    public signer!: string | null;
    public callIndex!: number;
    public encodedLength!: number;
    public type!: number;
    public version!: number;
    public era!: string | null;
}
