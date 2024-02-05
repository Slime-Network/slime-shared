export interface GetDIDInformationNeededForRecoveryRequest {
	walletId: number;
}

export interface GetDIDInformationNeededForRecoveryResponse {
	backup_dids: string[];
	coin_name: string;
	my_did: string;
	newpuzhash: string;
	pubkey: string;
	success: boolean;
	wallet_id: number;
}
