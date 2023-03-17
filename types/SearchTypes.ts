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

export type SearchParams = {
	url: string;
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

export type InstallDataParams = {
	url: string;
	productId: string;
	offer: string;
};

export type RequestListingOrUpdateParams = {
	url: string;
	media: Media;
};

export type SetMediaPublicParams = {
	url: string;
	isPublic: boolean;
	productId: string;
};
