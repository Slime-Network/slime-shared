import { invoke } from '@tauri-apps/api';
import React, { ReactNode, createContext } from 'react';

import {
	DownloadMediaRequest,
	DownloadMediaResponse,
	GostiConfig,
	SignNostrMessageRequest,
	SignNostrMessageResponse,
	AddNostrKeypairRequest,
	AddNostrKeypairResponse,
	HasNostrPrivateKeyRequest,
	HasNostrPrivateKeyResponse,
	GetInstallStatusRequest,
	GetInstallStatusResponse,
	GetLocalMediaMetadataRequest,
	GetLocalMediaMetadataResponse,
	InstallMediaRequest,
	InstallMediaResponse,
	LaunchMediaRequest,
	LaunchMediaResponse,
	SaveLocalMediaMetadataRequest,
	SaveLocalMediaMetadataResponse,
	DeleteMediaRequest,
	DeleteMediaResponse,
	UninstallMediaRequest,
	UninstallMediaResponse,
	GetOperatingSystemResponse,
} from '../types/gosti/GostiRpcTypes';

/**
 * Types
 */
interface IContext {
	gostiConfig: GostiConfig;
	fetchGostiConfig: () => Promise<GostiConfig>;
	setGostiConfig: React.Dispatch<React.SetStateAction<GostiConfig>>;
	signNostrMessage: (params: SignNostrMessageRequest) => Promise<SignNostrMessageResponse>;
	addNostrKeypair: (params: AddNostrKeypairRequest) => Promise<AddNostrKeypairResponse>;
	hasNostrPrivateKey: (params: HasNostrPrivateKeyRequest) => Promise<HasNostrPrivateKeyResponse>;
	getOperatingSystem: () => Promise<GetOperatingSystemResponse>;
	getInstallStatus: (params: GetInstallStatusRequest) => Promise<GetInstallStatusResponse>;
	getLocalMediaMetadata: (params: GetLocalMediaMetadataRequest) => Promise<GetLocalMediaMetadataResponse>;
	saveLocalMediaMetadata: (params: SaveLocalMediaMetadataRequest) => Promise<SaveLocalMediaMetadataResponse>;
	downloadMedia: (params: DownloadMediaRequest) => Promise<DownloadMediaResponse>;
	deleteMedia: (params: DeleteMediaRequest) => Promise<DeleteMediaResponse>;
	installMedia: (params: InstallMediaRequest) => Promise<InstallMediaResponse>;
	uninstallMedia: (params: UninstallMediaRequest) => Promise<UninstallMediaResponse>;
	launchMedia: (params: LaunchMediaRequest) => Promise<LaunchMediaResponse>;
}

/**
 * Context
 */
export const GostiApiContext = createContext<IContext>({} as IContext);

/**
 * Provider
 */
export const GostiApiContextProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
	const [gostiConfig, setGostiConfig] = React.useState<GostiConfig>({
		nostrRelays: ['wss://api.gosti.network:7000'],
		activeMarketplace: { displayName: 'LocalHost', url: 'http://localhost:5233' },
		installsPath: './gosti-data/installs/',
		marketplaces: [
			{ displayName: 'Localhost', url: 'http://localhost:5233' },
			{ displayName: 'Gosti Marketplace', url: 'http://api.gosti.network' },
		],
		mediaDataPath: './gosti-data/media/',
		mintingDataPath: './gosti-data/minting/',
		torrentsPath: './gosti-data/torrents/',
		identity: { activeDID: '', currentNostrPublicKey: '', proof: '' },
		default: true,
	});

	React.useEffect(() => {
		const fetchConfig = async () => {
			const configResponse: any = await invoke('get_config');
			console.log('get_config', configResponse);
			configResponse.result.default = false;
			console.log('setGostiConfig', configResponse.result);
			console.log('prev gostiConfig', gostiConfig);
			setGostiConfig(configResponse.result);
		};

		const saveConfig = async () => {
			console.log('save_config bef', gostiConfig);
			const configResponse: any = await invoke('save_config', { newConfig: gostiConfig });
			console.log('save_config', gostiConfig, configResponse);
		};

		if (gostiConfig.default) {
			console.log('fetchConfig');
			fetchConfig();
		} else {
			console.log('gostiConfig already set');
			saveConfig();
		}
	}, [gostiConfig]);

	const fetchGostiConfig = async () => {
		if (gostiConfig) {
			return gostiConfig;
		}
		const configResponse: any = await invoke('get_config');
		console.log('fetchGostiConfig', configResponse);
		configResponse.result.default = false;
		setGostiConfig(configResponse.result);
		return configResponse.result;
	};

	const signNostrMessage = async (params: SignNostrMessageRequest) => {
		try {
			return (await invoke('sign_nostr_message', params)) as SignNostrMessageResponse;
		} catch (e) {
			console.error(e);
			return { signature: '', message: e, status: 'error' } as SignNostrMessageResponse;
		}
	};

	const addNostrKeypair = async (params: AddNostrKeypairRequest) => {
		try {
			return (await invoke('add_nostr_keypair', { params })) as AddNostrKeypairResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as AddNostrKeypairResponse;
		}
	};

	const hasNostrPrivateKey = async (params: HasNostrPrivateKeyRequest) => {
		try {
			return (await invoke('has_nostr_private_key', { params })) as HasNostrPrivateKeyResponse;
		} catch (e) {
			console.error(e);
			return { hasPrivateKey: false, message: e, status: 'error' } as HasNostrPrivateKeyResponse;
		}
	};

	const getOperatingSystem = async () => {
		try {
			return (await invoke('get_operating_system')) as GetOperatingSystemResponse;
		} catch (e) {
			console.error(e);
			return { message: e, platform: 'error', status: 'error' } as GetOperatingSystemResponse;
		}
	};

	const getInstallStatus = async (params: GetInstallStatusRequest) => {
		try {
			return (await invoke('get_install_status', params)) as GetInstallStatusResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as GetInstallStatusResponse;
		}
	};

	const getLocalMediaMetadata = async (params: GetLocalMediaMetadataRequest) => {
		try {
			return (await invoke('get_local_media_metadata', params)) as GetLocalMediaMetadataResponse;
		} catch (e) {
			console.error(e);
			return { media: {}, message: e, status: 'error' } as GetLocalMediaMetadataResponse;
		}
	};

	const saveLocalMediaMetadata = async (params: SaveLocalMediaMetadataRequest) => {
		try {
			return (await invoke('save_local_media_metadata', params)) as SaveLocalMediaMetadataResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as SaveLocalMediaMetadataResponse;
		}
	};

	const downloadMedia = async (params: DownloadMediaRequest) => {
		try {
			return (await invoke('download_media', params)) as DownloadMediaResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as DownloadMediaResponse;
		}
	};

	const deleteMedia = async (params: DeleteMediaRequest) => {
		try {
			return (await invoke('delete_media', params)) as DeleteMediaResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as DeleteMediaResponse;
		}
	};

	const installMedia = async (params: InstallMediaRequest) => {
		try {
			return (await invoke('install_media', params)) as InstallMediaResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as InstallMediaResponse;
		}
	};

	const uninstallMedia = async (params: UninstallMediaRequest) => {
		try {
			return (await invoke('uninstall_media', params)) as UninstallMediaResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as UninstallMediaResponse;
		}
	};

	const launchMedia = async (params: LaunchMediaRequest) => {
		try {
			return (await invoke('launch_media', params)) as LaunchMediaResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as LaunchMediaResponse;
		}
	};

	return (
		<GostiApiContext.Provider
			value={{
				gostiConfig,
				fetchGostiConfig,
				setGostiConfig,
				signNostrMessage,
				addNostrKeypair,
				hasNostrPrivateKey,
				getOperatingSystem,
				getInstallStatus,
				getLocalMediaMetadata,
				saveLocalMediaMetadata,
				downloadMedia,
				deleteMedia,
				installMedia,
				uninstallMedia,
				launchMedia,
			}}
		>
			{children}
		</GostiApiContext.Provider>
	);
};

export const useGostiApi = () => {
	const context = React.useContext(GostiApiContext);
	if (context === undefined) {
		throw new Error('useGostiApi must be used within a GostiApiContextProvider');
	}
	return context;
};
