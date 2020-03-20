
export default class Block {
    public number!: number;
    public logCount!: number;
    public extrinsicCount!: number;
    public transactionCount!: number;
    public size!: number;
    public eventCount!: number;
    public timestamp!: number;
    public parentHash!: string | null;
    public author!: string | null;
    public hash!: string;
    public stateRoot!: string;
    public extrinsicsRoot!: string;
    public finalized!: boolean;

}

