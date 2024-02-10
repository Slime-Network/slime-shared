export interface VerifyOfferRequest {
	offer: string;
}

export interface VerifyOfferResponse {
	success: boolean;
	error: string;
	fee: number;
	valid: boolean;
}
