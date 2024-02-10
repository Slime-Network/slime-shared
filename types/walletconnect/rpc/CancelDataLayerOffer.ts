export interface CancelDataLayerOfferRequest {
	tradeId: string;
	secure: string;
	fee: number;
}

export interface CancelDataLayerOfferResponse {
	success: boolean;
}
