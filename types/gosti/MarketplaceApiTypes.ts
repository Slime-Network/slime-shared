import { Media } from './Media';

export type Marketplace = {
	displayName: string;
	url: string;
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
	file: ReadableStream<Uint8Array>;
};

export type UploadTextRequest = {
	url: string;
	text: string;
};

export type UploadResponse = {
	hash: string;
	message: string;
};

export type GetFileRequest = {
	hash: string;
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
