export interface MessageDIDSpendRequest {
	walletId: number;
	coinAnnouncements: string[];
	puzzleAnnouncements: string[];
}

export interface MessageDIDSpendResponse {
	spendBundle: any;
	success: boolean;
}
