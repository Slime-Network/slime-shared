export interface DeleteKeyRequest {
	id: string;
	key: string;
	fee: number;
}

export interface DeleteKeyResponse {
	success: boolean;
	txId: string;
}
