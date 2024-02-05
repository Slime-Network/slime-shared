export interface RecoveryDIDSpendRequest {
	walletId: number;
	attestData: any;
	pubkey: string;
	puzhash: string;
	fee: number;
}

export interface RecoveryDIDSpendResponse {
	spendBundle: any;
	success: boolean;
}
