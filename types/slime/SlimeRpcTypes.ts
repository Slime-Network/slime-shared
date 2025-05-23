import { Language } from '../../constants/languages';
import { SocialLink } from '../../constants/social-links';
import { IdentityProof } from './MarketplaceApiTypes';
import type { Media, MediaFiles } from './Media';

export type SlimeConfig = {
	did?: string;
	activeProof?: IdentityProof;
	marketplaceDisplayName?: string;
	marketplaceUrl?: string;
	torrentClientPort?: number;
	languages?: Language[];
	installPath?: string;
	installPathDisplayName?: string;
	torrentPath?: string;
	torrentPathDisplayName?: string;
	mintingDataPath?: string;
};

export type AddMarketplaceRequest = {
	id: number;
	displayName: string;
	url: string;
};

export type AddMarketplaceResponse = {
	status: 'added' | 'error';
	message: string;
};

export type RemoveMarketplaceRequest = {
	id: number;
};
export type RemoveMarketplaceResponse = {
	status: 'removed' | 'error';
	message: string;
};

export type AddNostrRelayRequest = {
	displayName: string;
	url: string;
};
export type AddNostrRelayResponse = {
	status: 'added' | 'error';
	message: string;
};
export type RemoveNostrRelayRequest = {
	id: number;
};
export type RemoveNostrRelayResponse = {
	status: 'removed' | 'error';
	message: string;
};

export type SetActiveIdentityRequest = {
	did: string;
};
export type SetActiveIdentityResponse = {
	status: 'set' | 'error';
	message: string;
};
export type AddIdentityRequest = {
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
export type AddIdentityResponse = {
	status: 'added' | 'error';
	message: string;
};

export type RemoveIdentityRequest = {
	did: string;
};

export type RemoveIdentityResponse = {
	status: 'removed' | 'error';
	message: string;
};

export type SetActiveMarketplaceRequest = {
	marketplaceId: number;
};

export type SetActiveMarketplaceResponse = {
	status: 'set' | 'error';
	message: string;
};

export type GetInstallPathsRequest = {};

export type GetInstallPathsResponse = {
	status: 'found' | 'error';
	message: string;
	paths: any;
};

export type AddInstallPathRequest = {
	path: string;
	displayName: string;
};

export type AddInstallPathResponse = {
	status: 'added' | 'error';
	message: string;
};

export type RemoveInstallPathRequest = {
	id: number;
};

export type RemoveInstallPathResponse = {
	status: 'removed' | 'error';
	message: string;
};

export type SetActiveInstallPathRequest = {
	id: number;
};

export type SetActiveInstallPathResponse = {
	status: 'set' | 'error';
	message: string;
};

export type GetTorrentPathsRequest = {};

export type GetTorrentPathsResponse = {
	status: 'found' | 'error';
	message: string;
	paths: any;
};

export type AddTorrentPathRequest = {
	path: string;
	displayName: string;
};

export type AddTorrentPathResponse = {
	status: 'added' | 'error';
	message: string;
};

export type RemoveTorrentPathRequest = {
	id: number;
};

export type RemoveTorrentPathResponse = {
	status: 'removed' | 'error';
	message: string;
};

export type SetActiveTorrentPathRequest = {
	id: number;
};

export type SetActiveTorrentPathResponse = {
	status: 'set' | 'error';
	message: string;
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
	proof: string;
};

export type AddNostrKeypairResponse = {
	status: 'success' | 'error';
	message: string;
};

export type HasNostrPrivateKeyRequest = {
	publicKey: string;
};

export type HasNostrPrivateKeyResponse = {
	status: 'success' | 'error';
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
