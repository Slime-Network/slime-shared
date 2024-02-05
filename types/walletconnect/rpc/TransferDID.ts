export interface TransferDIDRequest {
	walletId: number;
	innerAddress: string;
	fee: number;
	withRecoveryInfo: boolean;
	reusePuzhash: boolean;
}

export interface TransferDIDResponse {
	transaction: any;
	transactionId: string;
	success: boolean;
}
