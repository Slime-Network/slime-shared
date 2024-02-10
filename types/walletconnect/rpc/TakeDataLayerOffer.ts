export interface TakeDataLayerOfferRequest {
	offer: string;
	fee: number;
}

export interface TakeDataLayerOfferResponse {
	success: boolean;
	tradeId: string;
}
