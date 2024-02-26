import { Marketplace } from './MarketplaceApiTypes';
import type { Media } from './Media';

export type GostiConfig = {
	torrentsPath: string;
	marketplaces: Marketplace[];
	activeMarketplace: Marketplace;
	mintingDataPath: string;
	mediaDataPath: string;
	installsPath: string;
	currentNostrPublicKey: string;
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

export type DeleteMediaRequest = {
	media: Media;
};

export type DeleteMediaResponse = {
	status: 'deleted' | 'error' | 'complete';
	message: string;
};

export type InstallMediaRequest = {
	media: Media;
};

export type InstallMediaResponse = {
	status: 'installing' | 'error' | 'complete';
	message: string;
};

export type UninstallMediaRequest = {
	media: Media;
};

export type UninstallMediaResponse = {
	status: 'uninstalling' | 'error' | 'complete';
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
	isDownloaded: boolean;
	isInstalling: boolean;
	isInstalled: boolean;
	hasPendingUpdate: boolean;
	progress: number;
	isSeeding: boolean;
	downloadRate: number;
	uploadRate: number;
};

export type GetInstallStatusResponse = {
	status: InstallStatus;
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
	config: GostiConfig;
	message: string;
};

export type SaveConfigRequest = {
	config: GostiConfig;
};

export type SaveConfigResponse = {
	success: boolean;
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

export type TorrentStatus = {
	isDownloading: boolean;
	isDoneDownloading: boolean;
};

export type GetTorrentStatusResponse = {
	status: any;
	message: string;
};
