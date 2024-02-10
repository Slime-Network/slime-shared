export interface GetRootsRequest {
	ids: string[];
}

export interface GetRootsResponse {
	success: boolean;
	rootHashes: any;
}
