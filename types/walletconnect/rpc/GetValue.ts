export interface GetValueRequest {
	id: string;
	key: string;
	rootHash: string;
}

export interface GetValueResponse {
	success: boolean;
	value: string;
}
