export interface MintBulkRequest {
	walletId: number;
	metadataList: string[];
	royaltyPercentage?: number;
	royaltyAddress?: string;
	targetList?: string[];
	mintNumberStart?: number;
	mintTotal?: number;
	xchCoinList?: string[];
	xchChangeTarget?: string;
	newInnerpuzhash?: string;
	newP2Puzhash?: string;
	didCoinDict?: string;
	didLineageParentHex?: string;
	mintFromDid?: boolean;
	fee?: number;
	reusePuzhash?: boolean;
}

export type MintBulkResponse = {
	spendBundle: string;
};
