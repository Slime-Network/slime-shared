export interface CreateDataStoreRequest {
	fee: number;
}

export interface CreateDataStoreResponse {
	success: boolean;
	id: string;
	txs: any;
}
