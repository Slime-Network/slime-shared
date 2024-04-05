export interface NftWalletWithDIDs {
	didId: string;
	didWalletId: number;
	walletId: number;
}

export interface GetNftWalletsWithDIDsRequest {}

export type GetNftWalletsWithDIDsResponse = NftWalletWithDIDs[];
