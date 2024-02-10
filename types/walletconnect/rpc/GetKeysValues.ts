export interface GetKeysValuesRequest {
	id: string;
	rootHash: string;
}

export interface GetKeysValuesResponse {
	success: boolean;
	keysValues: any;
}
