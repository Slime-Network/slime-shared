export interface CreateDIDAttestRequest {
	walletId: number;
	coinName: string;
	pubkey: string;
	puzhash: string;
}

export interface CreateDIDAttestResponse {
	didAmount: number;
	didInnerpuz: string;
	didParent: string;
	myDid: string;
	success: boolean;
	walletId: number;
}
