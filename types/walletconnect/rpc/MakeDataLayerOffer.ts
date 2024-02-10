export interface MakeDataLayerOfferRequest {
	maker: string;
	fee: number;
}

export interface MakeDataLayerOfferResponse {
	success: boolean;
	maker: any;
	taker: any;
}
