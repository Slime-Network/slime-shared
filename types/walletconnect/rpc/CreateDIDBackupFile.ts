export interface CreateDIDBackupFileRequest {
	walletId: number;
}

export interface CreateDIDBackupFileResponse {
	backupData: string;
	success: boolean;
	walletId: number;
}
