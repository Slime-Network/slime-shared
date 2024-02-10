export interface AddMissingFilesRequest {
	ids: string[];
	override: boolean;
	foldername: string;
}

export interface AddMissingFilesResponse {
	success: boolean;
}
