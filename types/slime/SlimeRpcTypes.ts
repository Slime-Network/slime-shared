import { Marketplace, NostrRelay } from './MarketplaceApiTypes';
import type { Media, MediaFiles } from './Media';

export type SlimeConfig = {
	torrentsPath: string;
	marketplaces: Marketplace[];
	activeMarketplace: Marketplace;
	mintingDataPath: string;
	mediaDataPath: string;
	installsPath: string;
	activeIdentity: Identity;
	identities: Identity[];
	nostrRelays: NostrRelay[];
	torrentClientPort: number;
	languages: string[];
};

export type Identity = {
	did: string;
	currentNostrPublicKey: string;
	proof: string;
};

export type SignNostrMessageRequest = {
	message: string;
};

export type SignNostrMessageResponse = {
	status: 'signed' | 'error';
	message: string;
	signature: string;
};

export type AddNostrKeypairRequest = {
	publicKey: string;
	privateKey: string;
};

export type AddNostrKeypairResponse = {
	status: 'added' | 'error';
	message: string;
};

export type HasNostrPrivateKeyRequest = {
	publicKey: string;
};

export type HasNostrPrivateKeyResponse = {
	status: 'hasPrivateKey' | 'error';
	message: string;
	hasPrivateKey: boolean;
};

export type GetOperatingSystemResponse = {
	status: 'found' | 'error';
	message: string;
	platform: 'windows' | 'mac' | 'linux' | 'error';
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

export type LaunchMediaRequest = {
	media: Media;
};

export type LaunchMediaResponse = {
	status: 'playing' | 'error';
	message: string;
	pid: string;
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
	status: 'found' | 'error';
	message: string;
	installStatus: InstallStatus;
};

export type GetLocalMediaMetadataRequest = {
	productId: string;
};

export type GetLocalMediaMetadataResponse = {
	status: 'found' | 'notFound' | 'error';
	media: Media;
	message: string;
};

export type SaveLocalMediaMetadataRequest = {
	media: Media;
};

export type SaveLocalMediaMetadataResponse = {
	status: 'saved' | 'error';
	message: string;
};

export type GetConfigRequest = {};

export type GetConfigResponse = {
	config: SlimeConfig;
	message: string;
};

export type SaveConfigRequest = {
	config: SlimeConfig;
};

export type SaveConfigResponse = {
	status: 'saved' | 'error';
	message: string;
};

export type GetPublishedMediaRequest = {
	dataStoreId: string;
};

export type GetPublishedMediaResponse = {
	media: Media[];
	message: string;
};

export type GenerateTorrentRequest = {
	mediaFiles: MediaFiles;
};

export type GenerateTorrentResponse = {
	torrent: string;
	fileName: string;
	size: number;
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

export type GetUrlDataHashRequest = {
	url: string;
};

export type GetUrlDataHashResponse = {
	hash: string;
	message: string;
};
