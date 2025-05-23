export type ChiaProfileMetadata = {
	slimeDisplayName?: string;
	slimeAvatar?: string;
	slimeBio?: string;
	slimeLocation?: string;
	slimeLanguages?: string;
	slimeLinks?: string;
	slimeProofs?: string;
	slimeActiveProof?: string;
};

export type ChiaProfile = {
	name: string;
	did: string;
	coinId: string;
	p2Address: string;
	walletId: number;
	metadata: ChiaProfileMetadata;
	coinAvailable: boolean;
};
