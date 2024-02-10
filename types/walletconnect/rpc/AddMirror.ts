export interface AddMirrorRequest {
	id: string;
	urls: string[];
	amount: number;
	fee: number;
}

export interface AddMirrorResponse {
	success: boolean;
}
