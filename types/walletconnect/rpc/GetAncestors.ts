export interface GetAncestorsRequest {
	id: string;
	hash: string;
}

export interface GetAncestorsResponse {
	success: boolean;
	ancestors: any;
}
