import { invoke } from '@tauri-apps/api';
import React, { ReactNode, createContext } from 'react';

import { Identity, Marketplace, NostrRelay, SlimePath } from '../types/slime/MarketplaceApiTypes';
import {
	DownloadMediaRequest,
	DownloadMediaResponse,
	SlimeConfig,
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
	GenerateTorrentRequest,
	GenerateTorrentResponse,
	GetUrlDataHashRequest,
	GetUrlDataHashResponse,
	AddMarketplaceRequest,
	AddMarketplaceResponse,
	RemoveMarketplaceRequest,
	RemoveMarketplaceResponse,
	AddNostrRelayRequest,
	AddNostrRelayResponse,
	RemoveNostrRelayRequest,
	RemoveNostrRelayResponse,
	SetActiveIdentityRequest,
	SetActiveIdentityResponse,
	AddIdentityRequest,
	AddIdentityResponse,
	SetActiveMarketplaceRequest,
	SetActiveMarketplaceResponse,
	GetInstallPathsRequest,
	GetInstallPathsResponse,
	AddInstallPathRequest,
	AddInstallPathResponse,
	RemoveInstallPathRequest,
	RemoveInstallPathResponse,
	GetTorrentPathsRequest,
	GetTorrentPathsResponse,
	AddTorrentPathRequest,
	AddTorrentPathResponse,
	SetActiveTorrentPathRequest,
	SetActiveTorrentPathResponse,
	SetActiveInstallPathRequest,
	SetActiveInstallPathResponse,
	RemoveIdentityRequest,
	RemoveIdentityResponse,
} from '../types/slime/SlimeRpcTypes';

/**
 * Types
 */
interface IContext {
	slimeConfig: SlimeConfig | undefined;
	marketplaces: Marketplace[] | undefined;
	nostrRelays: NostrRelay[] | undefined;
	identities: Identity[] | undefined;
	installPaths: SlimePath[] | undefined;
	torrentPaths: SlimePath[] | undefined;
	addMarketplace: (params: AddMarketplaceRequest) => Promise<AddMarketplaceResponse>;
	removeMarketplace: (params: RemoveMarketplaceRequest) => Promise<RemoveMarketplaceResponse>;
	setActiveMarketplace: (params: SetActiveMarketplaceRequest) => Promise<SetActiveMarketplaceResponse>;
	addNostrRelay: (params: AddNostrRelayRequest) => Promise<AddNostrRelayResponse>;
	removeNostrRelay: (params: RemoveNostrRelayRequest) => Promise<RemoveNostrRelayResponse>;
	setActiveIdentity: (params: SetActiveIdentityRequest) => Promise<SetActiveIdentityResponse>;
	addIdentity: (params: AddIdentityRequest) => Promise<AddIdentityResponse>;
	removeIdentity: (params: RemoveIdentityRequest) => Promise<RemoveIdentityResponse>;
	getInstallPaths: (params: GetInstallPathsRequest) => Promise<GetInstallPathsResponse>;
	addInstallPath: (params: AddInstallPathRequest) => Promise<AddInstallPathResponse>;
	removeInstallPath: (params: RemoveInstallPathRequest) => Promise<RemoveInstallPathResponse>;
	setActiveInstallPath: (params: SetActiveInstallPathRequest) => Promise<SetActiveInstallPathResponse>;
	getTorrentPaths: (params: GetTorrentPathsRequest) => Promise<GetTorrentPathsResponse>;
	addTorrentPath: (params: AddTorrentPathRequest) => Promise<AddTorrentPathResponse>;
	removeTorrentPath: (params: RemoveInstallPathRequest) => Promise<RemoveInstallPathResponse>;
	setActiveTorrentPath: (params: SetActiveTorrentPathRequest) => Promise<SetActiveTorrentPathResponse>;
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
	generateTorrent: (params: GenerateTorrentRequest) => Promise<GenerateTorrentResponse>;
	getUrlDataHash: (params: GetUrlDataHashRequest) => Promise<GetUrlDataHashResponse>;
}

/**
 * Context
 */
export const SlimeApiContext = createContext<IContext>({} as IContext);

/**
 * Provider
 */
export const SlimeApiContextProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
	const [slimeConfig, setSlimeConfig] = React.useState<SlimeConfig>();
	const [identities, setIdentities] = React.useState<Identity[]>();
	const [nostrRelays, setNostrRelays] = React.useState<NostrRelay[]>();
	const [marketplaces, setMarketplaces] = React.useState<Marketplace[]>();
	const [installPaths, setInstallPaths] = React.useState<SlimePath[]>();
	const [torrentPaths, setTorrentPaths] = React.useState<SlimePath[]>();

	const fetchSlimeConfig = React.useCallback(async () => {
		const configResponse: any = await invoke('get_config');
		configResponse.result.activeProof = JSON.parse(configResponse.result.activeProof);
		configResponse.result.languages = JSON.parse(configResponse.result.languages);
		setSlimeConfig(configResponse.result);
	}, [setSlimeConfig]);

	React.useEffect(() => {
		if (!slimeConfig) {
			fetchSlimeConfig();
		}
	}, [slimeConfig, fetchSlimeConfig]);

	const fetchIdentities = React.useCallback(async () => {
		const response: any = await invoke('get_identities');
		setIdentities(
			response.map((identity: any) => ({
				...identity,
				activeProof: JSON.parse(identity.activeProof),
				languages: JSON.parse(identity.languages),
				links: JSON.parse(identity.links),
				proofs: JSON.parse(identity.proofs),
			}))
		);
	}, [setIdentities]);

	React.useEffect(() => {
		if (!identities) {
			fetchIdentities();
		}
	}, [identities, fetchIdentities]);

	const fetchMarketplaces = React.useCallback(async () => {
		const response: any = await invoke('get_marketplaces');
		setMarketplaces(response);
	}, [setMarketplaces]);

	React.useEffect(() => {
		if (!marketplaces) {
			fetchMarketplaces();
		}
	}, [marketplaces, fetchMarketplaces]);

	const fetchNostrRelays = React.useCallback(async () => {
		const response: any = await invoke('get_nostr_relays');
		setNostrRelays(response);
	}, [setNostrRelays]);

	React.useEffect(() => {
		if (!nostrRelays) {
			fetchNostrRelays();
		}
	}, [nostrRelays, fetchNostrRelays]);

	const fetchInstallPaths = React.useCallback(async () => {
		const response: any = await invoke('get_install_paths');
		setInstallPaths(response);
	}, [setInstallPaths]);

	React.useEffect(() => {
		if (!installPaths) {
			fetchInstallPaths();
		}
	}, [installPaths, fetchInstallPaths]);

	const fetchTorrentPaths = React.useCallback(async () => {
		const response: any = await invoke('get_torrent_paths');
		setTorrentPaths(response);
	}, [setTorrentPaths]);

	React.useEffect(() => {
		if (!torrentPaths) {
			fetchTorrentPaths();
		}
	}, [torrentPaths, fetchTorrentPaths]);

	const addMarketplace = async (params: AddMarketplaceRequest) => {
		try {
			const highestId = marketplaces?.length ? Math.max(...marketplaces.map((marketplace) => marketplace.id)) : 0;
			marketplaces?.push({ id: highestId + 1, displayName: params.displayName, url: params.url });
			if (!marketplaces) {
				setMarketplaces([{ id: highestId + 1, displayName: params.displayName, url: params.url }]);
			} else {
				setMarketplaces([...marketplaces!]);
			}
			return (await invoke('add_marketplace', { params })) as AddMarketplaceResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as AddMarketplaceResponse;
		}
	};

	const removeMarketplace = async (params: RemoveMarketplaceRequest) => {
		if (!marketplaces) {
			return { message: 'No marketplaces found', status: 'error' } as RemoveMarketplaceResponse;
		}
		try {
			const index = marketplaces.findIndex((marketplace) => marketplace.id === params.id);
			if (index === -1) {
				return { message: 'Marketplace not found', status: 'error' } as RemoveMarketplaceResponse;
			}
			marketplaces.splice(index, 1);
			setMarketplaces([...marketplaces]);
			return (await invoke('remove_marketplace', { params })) as RemoveMarketplaceResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as RemoveMarketplaceResponse;
		}
	};

	const setActiveMarketplace = async (params: SetActiveMarketplaceRequest) => {
		try {
			const active = marketplaces?.find((marketplace) => marketplace.id === params.marketplaceId);
			setSlimeConfig({
				...slimeConfig,
				marketplaceUrl: active?.url,
				marketplaceDisplayName: active?.displayName,
			});
			return (await invoke('set_active_marketplace', { params })) as SetActiveMarketplaceResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as SetActiveMarketplaceResponse;
		}
	};

	const addNostrRelay = async (params: AddNostrRelayRequest) => {
		try {
			return (await invoke('add_nostr_relay', { params })) as AddNostrRelayResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as AddNostrRelayResponse;
		}
	};

	const removeNostrRelay = async (params: RemoveNostrRelayRequest) => {
		if (!nostrRelays) {
			return { message: 'No relays found', status: 'error' } as RemoveNostrRelayResponse;
		}
		try {
			const index = nostrRelays?.findIndex((relay) => relay.id === params.id);
			if (index === -1) {
				return { message: 'Relay not found', status: 'error' } as RemoveNostrRelayResponse;
			}
			nostrRelays.splice(index, 1);
			setNostrRelays([...nostrRelays!]);
			return (await invoke('remove_nostr_relay', { params })) as RemoveNostrRelayResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as RemoveNostrRelayResponse;
		}
	};

	const setActiveIdentity = async (params: SetActiveIdentityRequest) => {
		try {
			const active = identities?.find((identity) => identity.did === params.did);
			setSlimeConfig({
				...slimeConfig,
				did: active?.did,
				activeProof: active?.activeProof,
			});
			return (await invoke('set_active_identity', { params })) as SetActiveIdentityResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as SetActiveIdentityResponse;
		}
	};

	const addIdentity = async (params: AddIdentityRequest) => {
		if (!identities) {
			return { message: 'No identities found', status: 'error' } as AddIdentityResponse;
		}
		try {
			const contains = identities?.some((identity) => identity.did === params.did);
			if (contains) {
				const index = identities?.findIndex((identity) => identity.did === params.did);
				identities?.splice(index, 1);
				identities?.push({
					did: params.did,
					activeProof: params.activeProof,
					avatar: params.avatar,
					displayName: params.displayName,
					bio: params.bio,
					location: params.location,
					languages: params.languages,
					links: params.links,
					proofs: params.proofs,
				});
			} else {
				identities?.push({
					did: params.did,
					activeProof: params.activeProof,
					avatar: params.avatar,
					displayName: params.displayName,
					bio: params.bio,
					location: params.location,
					languages: params.languages,
					links: params.links,
					proofs: params.proofs,
				});
			}
			setIdentities([...identities]);
			const stringified = {
				...params,
				activeProof: JSON.stringify(params.activeProof),
				languages: JSON.stringify(params.languages),
				links: JSON.stringify(params.links),
				proofs: JSON.stringify(params.proofs),
			};
			return (await invoke('add_identity', { params: stringified })) as AddIdentityResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as AddIdentityResponse;
		}
	};

	const removeIdentity = async (params: RemoveIdentityRequest) => {
		if (!identities) {
			return { message: 'No identities found', status: 'error' } as RemoveIdentityResponse;
		}
		try {
			const index = identities?.findIndex((identity) => identity.did === params.did);
			if (index === -1) {
				return { message: 'Identity not found', status: 'error' } as RemoveIdentityResponse;
			}
			identities?.splice(index, 1);
			setIdentities([...identities]);
			return (await invoke('remove_identity', { params })) as RemoveIdentityResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as RemoveIdentityResponse;
		}
	};

	const getInstallPaths = async (params: GetInstallPathsRequest) => {
		try {
			return (await invoke('get_install_paths', { params })) as GetInstallPathsResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as GetInstallPathsResponse;
		}
	};

	const addInstallPath = async (params: AddInstallPathRequest) => {
		try {
			const highestId = installPaths?.length ? Math.max(...installPaths.map((path) => path.id)) : 0;
			installPaths?.push({ id: highestId + 1, displayName: params.displayName, path: params.path });
			setInstallPaths([...installPaths!]);
			return (await invoke('add_install_path', { params })) as AddInstallPathResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as AddInstallPathResponse;
		}
	};

	const removeInstallPath = async (params: RemoveInstallPathRequest) => {
		if (!installPaths) {
			return { message: 'No install paths found', status: 'error' } as RemoveInstallPathResponse;
		}
		try {
			const index = installPaths?.findIndex((path) => path.id === params.id);
			if (index === -1) {
				return { message: 'Install path not found', status: 'error' } as RemoveInstallPathResponse;
			}
			installPaths?.splice(index, 1);
			setInstallPaths([...installPaths!]);
			return (await invoke('remove_install_path', { params })) as RemoveInstallPathResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as RemoveInstallPathResponse;
		}
	};

	const setActiveInstallPath = async (params: SetActiveInstallPathRequest) => {
		try {
			const active = installPaths?.find((path) => path.id === params.id);
			setSlimeConfig({ ...slimeConfig, installPath: active?.path, installPathDisplayName: active?.displayName });
			return (await invoke('set_active_install_path', { params })) as SetActiveInstallPathResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as SetActiveInstallPathResponse;
		}
	};

	const getTorrentPaths = async (params: GetTorrentPathsRequest) => {
		try {
			return (await invoke('get_torrent_paths', { params })) as GetTorrentPathsResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as GetTorrentPathsResponse;
		}
	};

	const addTorrentPath = async (params: AddTorrentPathRequest) => {
		try {
			const highestId = torrentPaths?.length ? Math.max(...torrentPaths.map((path) => path.id)) : 0;
			torrentPaths?.push({ id: highestId + 1, displayName: params.displayName, path: params.path });
			setTorrentPaths([...torrentPaths!]);
			return (await invoke('add_torrent_path', { params })) as AddTorrentPathResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as AddTorrentPathResponse;
		}
	};

	const removeTorrentPath = async (params: RemoveInstallPathRequest) => {
		if (!torrentPaths) {
			return { message: 'No torrent paths found', status: 'error' } as RemoveInstallPathResponse;
		}
		try {
			const index = torrentPaths?.findIndex((path) => path.id === params.id);
			if (index === -1) {
				return { message: 'Torrent path not found', status: 'error' } as RemoveInstallPathResponse;
			}
			torrentPaths?.splice(index, 1);
			setTorrentPaths([...torrentPaths]);
			return (await invoke('remove_torrent_path', { params })) as RemoveInstallPathResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as RemoveInstallPathResponse;
		}
	};

	const setActiveTorrentPath = async (params: SetActiveTorrentPathRequest) => {
		try {
			const active = torrentPaths?.find((path) => path.id === params.id);
			setSlimeConfig({ ...slimeConfig, torrentPath: active?.path, torrentPathDisplayName: active?.displayName });
			return (await invoke('set_active_torrent_path', { params })) as SetActiveTorrentPathResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as SetActiveTorrentPathResponse;
		}
	};

	const signNostrMessage = async (params: SignNostrMessageRequest) => {
		try {
			return (await invoke('sign_nostr_message', { params })) as SignNostrMessageResponse;
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
			return (await invoke('get_install_status', { params })) as GetInstallStatusResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as GetInstallStatusResponse;
		}
	};

	const getLocalMediaMetadata = async (params: GetLocalMediaMetadataRequest) => {
		try {
			return (await invoke('get_local_media_metadata', { params })) as GetLocalMediaMetadataResponse;
		} catch (e) {
			console.error(e);
			return { media: {}, message: e, status: 'error' } as GetLocalMediaMetadataResponse;
		}
	};

	const saveLocalMediaMetadata = async (params: SaveLocalMediaMetadataRequest) => {
		try {
			return (await invoke('save_local_media_metadata', { params })) as SaveLocalMediaMetadataResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as SaveLocalMediaMetadataResponse;
		}
	};

	const downloadMedia = async (params: DownloadMediaRequest) => {
		try {
			return (await invoke('download_media', { params })) as DownloadMediaResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as DownloadMediaResponse;
		}
	};

	const deleteMedia = async (params: DeleteMediaRequest) => {
		try {
			return (await invoke('delete_media', { params })) as DeleteMediaResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as DeleteMediaResponse;
		}
	};

	const installMedia = async (params: InstallMediaRequest) => {
		try {
			return (await invoke('install_media', { params })) as InstallMediaResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as InstallMediaResponse;
		}
	};

	const uninstallMedia = async (params: UninstallMediaRequest) => {
		try {
			return (await invoke('uninstall_media', { params })) as UninstallMediaResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as UninstallMediaResponse;
		}
	};

	const launchMedia = async (params: LaunchMediaRequest) => {
		try {
			return (await invoke('launch_media', { params })) as LaunchMediaResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as LaunchMediaResponse;
		}
	};

	const generateTorrent = async (params: GenerateTorrentRequest) => {
		try {
			return (await invoke('generate_torrent', { params })) as GenerateTorrentResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as unknown as GenerateTorrentResponse;
		}
	};

	const getUrlDataHash = async (params: GetUrlDataHashRequest) => {
		try {
			return (await invoke('get_url_data_hash', { params })) as GetUrlDataHashResponse;
		} catch (e) {
			console.error(e);
			return { message: e, status: 'error' } as unknown as GetUrlDataHashResponse;
		}
	};

	return (
		<SlimeApiContext.Provider
			value={{
				slimeConfig,
				marketplaces,
				nostrRelays,
				identities,
				installPaths,
				torrentPaths,
				addMarketplace,
				removeMarketplace,
				setActiveMarketplace,
				addNostrRelay,
				removeNostrRelay,
				addIdentity,
				removeIdentity,
				setActiveIdentity,
				getInstallPaths,
				addInstallPath,
				removeInstallPath,
				setActiveInstallPath,
				getTorrentPaths,
				addTorrentPath,
				removeTorrentPath,
				setActiveTorrentPath,
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
				generateTorrent,
				getUrlDataHash,
			}}
		>
			{children}
		</SlimeApiContext.Provider>
	);
};

export const useSlimeApi = () => {
	const context = React.useContext(SlimeApiContext);
	if (context === undefined) {
		throw new Error('useSlimeApi must be used within a SlimeApiContextProvider');
	}
	return context;
};
