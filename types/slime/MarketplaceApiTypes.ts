import { Language } from '../../constants/languages';
import { SocialLink } from '../../constants/social-links';
import { Media } from './Media';

export type Marketplace = {
	id: number;
	displayName: string;
	url: string;
};

export type NostrRelay = {
	id: number;
	displayName: string;
	url: string;
};

export type Identity = {
	did: string;
	activeProof: IdentityProof;
	displayName: string;
	avatar: string;
	bio: string;
	location: string;
	languages: Language[];
	links: SocialLink[];
	proofs: IdentityProof[];
};

export type SlimePath = {
	id: number;
	displayName: string;
	path: string;
};

export type IdentityProof = {
	pubkey: string;
	proof: string;
};

export enum SortOptions {
	DateAsc,
	DateDesc,
	RatingAsc,
	RatingDesc,
	lastUpdatedAsc,
	lastUpdatedDesc,
	NameAsc,
	NameDesc,
}

export type SearchResponse = {
	results: Media[];
	message: string;
};

export type SearchRequest = {
	titleTerm: string;
	mediaType: string;
	creatorTerm: string;
	publisherTerm: string;
	offset: number;
	sort: SortOptions;
	tags: string[];
	status: string;
	includeAdultOnly: boolean;
	size: number;
};

export type GetInstallDataResponse = {
	installData: Media;
	message: string;
};

export type GetInstallDataRequest = {
	media: Media;
	pubkey: string;
	signature: string;
};

export type UploadFileRequest = {
	url: string;
	file: File;
};

export type UploadTextRequest = {
	url: string;
	text: string;
};

export type UploadResponse = {
	id: string;
	message: string;
};

export type GetFileRequest = {
	id: string;
};

export type GetFileResponse = {
	file: string;
	message: string;
};

export type RequestListingOrUpdateResponse = {
	currentStatus: 'Unlisted' | 'Listed' | 'Updated' | 'Pending Approval' | 'Rejected' | 'Error';
	message: string;
};

export type RequestListingOrUpdateRequest = {
	url: string;
	setPublic: boolean;
	media: Media;
};

export type SetMediaPublicResponse = {
	currentStatus: 'Unlisted' | 'Listed' | 'Updated' | 'Pending Approval' | 'Rejected' | 'Error';
	message: string;
};

export type SetMediaPublicRequest = {
	url: string;
	isPublic: boolean;
	media: Media;
};

export type GetSignMessageResponse = {
	message: string;
};

export type GetSignMessageRequest = {
	media: Media;
};
