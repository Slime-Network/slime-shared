export interface GetDIDInfoRequest {
	coinId: string;
}

export interface GetDIDInfoResponse {
	full_puzzle: string;
	hints: string;
	latest_coin: string;
	launcher_id: string;
	metadata: string;
	num_verification: number;
	p2_address: string;
	public_key: string;
	recovery_list_hash: string;
	success: boolean;
}
