export enum Status {
    NotStarted,
    Started,
    Ended
}

export const convertToStatus = (s: string) => {
    if (s == 'NotStarted') {
        return Status.NotStarted;
    }
    if (s == 'Started') {
        return Status.Started;
    }
    return Status.Ended;
};

export interface ISaleStatusProvider {
    addresses: any;
}

export interface IAccountStateProvider {
    initialLockedAmount: number;
    currentLockedAmount: number;
    claimableReleaseAmount: number;
    last_claim_timestamp: number;
}
export interface IAccountStateProvider_2 {
    boughtAmount_2: number;
    lockedAmount_2: number;
    claimableAmount_2: number;
    claimedReleaseCount_2: number;
    claimableReleaseCount_2: number;
}
export interface IAccountStateProvider_3 {
    boughtAmount_3: number;
    lockedAmount_3: number;
    claimableAmount_3: number;
    claimedReleaseCount_3: number;
    claimableReleaseCount_3: number;
}