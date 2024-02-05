export interface FindLostDIDRequest {
	coinId: string;
	recoveryListHash: string;
	numVerification: number;
	metadata: string;
}

export interface FindLostDIDResponse {
	latestCoinId: string;
	success: boolean;
}
