export interface GetKeysRequest {
	id: string;
	rootHash: string;
}

export interface GetKeysResponse {
	success: boolean;
	keys: any;
}
