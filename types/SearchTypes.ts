
export enum sortOptions {
	DateAsc,
	DateDesc,
	RatingAsc,
	RatingDesc,
	lastUpdatedAsc,
	lastUpdatedDesc,
	NameAsc,
	NameDesc,
};

export type SearchParams = {
	titleTerm: string;
	creatorTerm: string;
	publisherTerm: string;
	offset: number;
	sort: sortOptions;
	tags: string[];
	status: string;
	includeAdultOnly: boolean;
};

export type InstallDataParams = {
	productId: string;
	offer: string;
};