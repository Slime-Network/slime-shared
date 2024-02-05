import { WalletType } from '../WalletType';

export interface CreateNewDIDWalletRequest {
	amount: number;
	fee: number;
	backupDids: string[];
	numOfBackupIdsNeeded: number;
}

export interface CreateNewDIDWalletResponse {
	myDid: string;
	type: WalletType.DecentralizedId;
	walletId: number;
	success: true;
}
