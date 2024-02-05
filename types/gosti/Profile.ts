export type ProfileMetadata = {
	gostiDisplayName?: string;
	gostiAvatar?: string;
	gostiBio?: string;
	gostiLocation?: string;
	gostiWebsite?: string;
	gostiTwitter?: string;
	gostiFacebook?: string;
	gostiInstagram?: string;
	gostiLinkedin?: string;
	gostiNostrPublicKeys?: string;
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
