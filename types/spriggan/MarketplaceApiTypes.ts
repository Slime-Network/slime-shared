import { Media } from './Media';

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
	productId: string;
	pubkey: string;
	signature: string;
};

export type RequestListingOrUpdateResponse = {
	currentStatus: 'Unlisted' | 'Listed' | 'Updated' | 'Pending Approval' | 'Rejected' | 'Error';
	message: string;
};

export type RequestListingOrUpdateRequest = {
	media: Media;
};

export type SetMediaPublicResponse = {
	currentStatus: 'Unlisted' | 'Listed' | 'Updated' | 'Pending Approval' | 'Rejected' | 'Error';
	message: string;
};

export type SetMediaPublicRequest = {
	isPublic: boolean;
	productId: string;
};

export type GetSignMessageResponse = {
	message: string;
};

export type GetSignMessageRequest = {
	message: string;
};
