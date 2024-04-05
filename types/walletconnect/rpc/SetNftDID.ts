import { SpendBundle } from '../SpendBundle';

export interface SetNftDIDRequest {
	walletId: number;
	nftLauncherId: string;
	nftCoinIds: string[];
	did: string;
	fee: number;
}

export interface SetNftDIDResponse {
	spendBundle: SpendBundle;
	walletId: number;
	success: true;
}
