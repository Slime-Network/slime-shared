export interface SetDIDNameRequest {
	walletId: number;
	name: string;
}

export interface SetDIDNameResponse {
	walletId: number;
	success: true;
}
