export interface GetDIDCurrentCoinInfoRequest {
	walletId: number;
}

export interface GetDIDCurrentCoinInfoResponse {
	did_amount: number;
	did_innerpuz: string;
	did_parent: string;
	my_did: string;
	success: boolean;
	wallet_id: number;
}
