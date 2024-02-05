export interface GetDIDRecoveryListRequest {
	walletId: number;
}

export interface GetDIDRecoveryListResponse {
	numRequired: number;
	recoveryList: string[];
	success: boolean;
	walletId: number;
}
