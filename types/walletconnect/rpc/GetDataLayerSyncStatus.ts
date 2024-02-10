export interface GetDataLayerSyncStatusRequest {
	id: string;
}

export interface GetDataLayerSyncStatusResponse {
	success: boolean;
	syncStatus: any;
}
