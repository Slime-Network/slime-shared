export interface UpdateDIDMetadataRequest {
	walletId: number;
	metadata: any;
	fee: number;
	reusePuzhash: boolean;
}

export interface UpdateDIDMetadataResponse {
	success: boolean;
}
