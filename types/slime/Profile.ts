export type ProfileMetadata = {
	slimeDisplayName?: string;
	slimeAvatar?: string;
	slimeBio?: string;
	slimeLocation?: string;
	slimeLanguages?: string;
	slimeLinks?: string;
	slimeNostrPublicKeys?: string;
	slimeActiveNostrPublicKey?: string;
};

export type Profile = {
	name: string;
	did: string;
	coinId: string;
	p2Address: string;
	walletId: number;
	metadata: ProfileMetadata;
	coinAvailable: boolean;
};
