export interface GetDIDRequest {
	walletId: number;
}

export interface GetDIDResponse {
	coinId: string;
	myDid: string;
	success: boolean;
	walletId: number;
}
