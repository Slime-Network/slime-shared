export interface BatchUpdateRequest {
	id: string;
	changelist: ChangelistChange[];
	fee: number;
}

export interface ChangelistChange {
	action: 'delete' | 'insert';
	key: string;
	value?: string;
}

export interface BatchUpdateResponse {
	success: boolean;
	txId: string;
}
