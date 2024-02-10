export interface GetRootRequest {
	id: string;
}

export interface GetRootResponse {
	success: boolean;
	hash: string;
	confirmed: boolean;
	timestamp: number;
}
