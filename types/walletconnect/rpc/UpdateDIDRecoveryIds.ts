export interface UpdateDIDRecoveryIdsRequest {
	walletId: number;
	newList: string[];
	numVerificationsRequired: number;
	fee: number;
	reusePuzhash: boolean;
}

export interface UpdateDIDRecoveryIdsResponse {
	success: boolean;
}
