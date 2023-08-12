import type { Media } from './Media';
import { Marketplace } from './types';

export type SprigganConfig = {
	torrentsPath: string;
	marketplaces: Marketplace[];
	activeMarketplace: Marketplace;
	mintingDataPath: string;
	mediaDataPath: string;
	installsPath: string;
};

export type PingRequest = {};

export type PingResponse = {
	message: string;
};

export type DownloadMediaRequest = {
	media: Media;
};

export type DownloadMediaResponse = {
	status: 'downloading' | 'error' | 'complete';
	message: string;
};

export type InstallMediaRequest = {
	media: Media;
};

export type InstallMediaResponse = {
	status: 'installing' | 'error' | 'complete';
	message: string;
};

export type PlayMediaRequest = {
	media: Media;
};

export type PlayMediaResponse = {
	pid: string;
	status: 'playing' | 'error';
	message: string;
};

export type GetInstallStatusRequest = {
	media: Media;
};

export type InstallStatus = {
	isDownloading: boolean;
	isDoneDownloading: boolean;
	isInstalling: boolean;
	isInstalled: boolean;
	hasPendingUpdate: boolean;
};

export type GetInstallStatusResponse = {
	status: InstallStatus | 'error';
	message: string;
};

export type GetLocalDataRequest = {
	productId: string;
};

export type GetLocalDataResponse = {
	media: Media;
	message: string;
};

export type SaveLocalDataRequest = {
	media: Media;
};

export type SaveLocalDataResponse = {
	status: 'saved' | 'error';
	message: string;
};

export type LoadAllLocalDataRequest = {};

export type LoadAllLocalDataResponse = {
	media: Media[];
	message: string;
};

export type GetConfigRequest = {};

export type GetConfigResponse = {
	config: SprigganConfig;
	message: string;
};

export type SaveConfigRequest = {
	config: SprigganConfig;
};

export type SaveConfigResponse = {
	success: boolean;
};

export type GetOwnedDataStoresRequest = {};

export type GetOwnedDataStoresResponse = {
	dataStoreIds: string[];
	message: string;
};

export type GetPublishedMediaRequest = {
	dataStoreId: string;
};

export type GetPublishedMediaResponse = {
	media: Media[];
};

export type PublishMediaRequest = {
	dataStoreId: string;
	media: Media;
	fee: number;
};

export type PublishMediaResponse = {
	message: string;
};

export type CreateDataStoreRequest = {
	fee: number;
};

export type CreateDataStoreResponse = {
	dataStoreId: string;
};

export type GenerateTorrentsRequest = {
	media: Media;
	sourcePaths: { windows: string; mac: string; linux: string };
};

export type GenerateTorrentsResponse = {
	torrents: string;
	message: string;
};

export type GetTorrentStatusRequest = {
	media: Media;
};

export type GetTorrentStatusResponse = {
	status: any;
	message: string;
};

export type MintingConfig = {
	quantity: number;
	batchSize: number;
	metadataUris: string[];
	imageUris: string[];
	licenseUris: string[];
	publisherDid: string;
	royaltyAddress: string;
	royaltyPercentage: number;
	fee: number;
	salePrice: number;
};

export type MintNftCopiesRequest = {
	mintingConfig: MintingConfig;
};

export type MintNftCopiesResponse = {
	status: 'minting' | 'error';
	message: string;
};
