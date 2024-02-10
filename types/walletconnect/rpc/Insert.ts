export interface InsertRequest {
	id: string;
	key: string;
	value: string;
	fee: number;
}

export interface InsertResponse {
	success: boolean;
	txId: string;
}
