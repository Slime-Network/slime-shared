import { Language } from '../../constants/languages';

export type NftMetadataResponse = {
	format: string;
	name: string;
	description: string;
	sensitive_content: boolean;
	collection: {
		name: string;
		id: string;
		attributes: [
			{
				type: string;
				value: string;
			}
		];
	};
	attributes: [
		{
			trait_type: string;
			value: string;
		}
	];
	minting_tool: string;
};

export type NftMetadataParsed = {
	isMediaNFT: boolean;
	mediaType: string;
	productId: string;
	productName: string;
	dataStoreId: string;
	edition: string;
	attributes: [
		{
			type: string;
			value: string;
		}
	];
	traits: [
		{
			trait_type: string;
			value: string;
		}
	];
};

export const parseNftMetadata = (resp: NftMetadataResponse): NftMetadataParsed => {
	let dataStoreId = '';
	let isMediaNFT = false;
	let edition = 'Standard';

	resp.collection.attributes.forEach((element: { type: string; value: string }) => {
		if (element.type === 'dataStore id') {
			dataStoreId = element.value;
			isMediaNFT = true;
		}
	});

	resp.attributes.forEach((element: { trait_type: string; value: string }) => {
		if (element.trait_type === 'Edition') {
			edition = element.value;
		}
	});

	// TODO: replace with updated metadata format
	return {
		isMediaNFT,
		mediaType: 'game',
		productId: resp.collection.id,
		productName: resp.collection.name,
		dataStoreId,
		edition,
		attributes: resp.collection.attributes,
		traits: resp.attributes,
	};
};

export type MediaUrlSource = {
	url: string;
	type: string;
	source: string;
	alt: string;
	language: Language;
};

export type MediaCredit = {
	did: string;
	role: string;
};

export type MediaContent = {
	content: string;
	description?: string;
	image?: string;
	value?: number;
};

export type MediaContentRating = {
	name: string;
	fullName: string;
	rating: string;
	link: string;
	containsContent: MediaContent[];
};

export type MediaDescription = {
	type: string;
	markdown: boolean;
	description: string;
	language: Language;
};

export type MediaExecutable = {
	platform: string;
	command: string;
};

export type MediaTag = {
	tag: string;
	weight: number;
	type: string;
	adult: boolean;
};

export type MediaTorrent = {
	platform: string;
	size: number;
	torrent: string;
};

export type MediaTitle = {
	title: string;
	language: Language;
};

export type Media = {
	mediaType: string;
	contentRatings: MediaContentRating[];
	descriptions: MediaDescription[];
	credits: MediaCredit[];
	childProducts: string[];
	executables: MediaExecutable[];
	lastUpdated: number;
	lastUpdatedContent: number;
	nostrEventId: string;
	password: string;
	images: MediaUrlSource[];
	videos: MediaUrlSource[];
	donationAddress: string;
	parentProductId: string;
	productId: string;
	publisherDid: string;
	releaseStatus: string;
	supportContact: string;
	tags: MediaTag[];
	titles: MediaTitle[];
	torrents: MediaTorrent[];
	version: string;
};
