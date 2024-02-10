export interface GetKvDiffRequest {
	id: string;
	hash1: string;
	hash2: string;
}

export interface GetKvDiffResponse {
	success: boolean;
	diff: any;
}
