export interface GetDIDNameRequest {
	walletId: number;
}

export interface GetDIDNameResponse {
	name: string;
	success: boolean;
	walletId: number;
}
