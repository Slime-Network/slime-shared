export interface GetDIDMetadataRequest {
	walletId: number;
}

export interface GetDIDMetadataResponse {
	metadata: any;
	success: boolean;
	wallet_id: number;
}
