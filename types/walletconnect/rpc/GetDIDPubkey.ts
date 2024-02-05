export interface GetDIDPubkeyRequest {
	walletId: number;
}

export interface GetDIDPubkeyResponse {
	pubkey: string;
	success: boolean;
}
