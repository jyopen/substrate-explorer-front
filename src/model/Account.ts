export default class Account {
    public accountId!: string;
    public accountNonce!: number;
    public availableBalance!: string;
    public freeBalance!: string;
    public frozenFee!: string;
    public frozenMisc!: string;
    public isVesting!: boolean;
    public lockedBalance!: string;
    public reservedBalance!: string;
    public vestedBalance!: string;
    public vestingTotal!: string;
    public votingBalance!: string;
    public lockedBreakdown!: string;
    public accountIndex!: string | null;
    public identity!: string;
    public nickname!: string | null;
}
