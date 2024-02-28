export type ProfileMetadata = {
	gostiDisplayName?: string;
	gostiAvatar?: string;
	gostiBio?: string;
	gostiLocation?: string;
	gostiLanguages?: string;
	gostiLinks?: string;
	gostiNostrPublicKeys?: string;
	gostiActiveNostrPublicKey?: string;
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
