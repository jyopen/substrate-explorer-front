
export default class Event {
    public id!: string;
    public blockNumber!: number;
    public section!: string;
    public method!: string;
    public indexes!: number;
    public eventIndex!: number;
    public timestamp!: number;
    public extrinsicIndex!: number | null;
    public relatedHash!: string | null;
    public args!: string;
    public topics!: string;
}

