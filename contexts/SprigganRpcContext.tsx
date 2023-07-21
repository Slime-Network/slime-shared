import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from "react";

import { SprigganMethods } from "../constants";
import { Media } from "../types/spriggan/Media";


export type SprigganConfig = {
	torrentsPath: string
}

// export type SprigganRPCParams = {
// 	media: Media,
// 	productId: string,
// 	dataStoreId: string,
// 	sourcePaths: { windows: string, mac: string, linux: string },
// 	config: SprigganConfig,
// 	fee: number,
// 	mintingConfig: {
// 		quantity: number,
// 		batchSize: number,
// 		metadataUris: string[],
// 		imageUris: string[],
// 		licenseUris: string[],
// 		publisherDid: string,
// 		royaltyAddress: string,
// 		royaltyPercentage: number,
// 		fee: number,
// 		salePrice: number,
// 	}
// }


export type PingRequest = {}

export type PingResponse = {
	success: boolean
}

export type DownloadMediaRequest = {
	media: Media
}

export type DownloadMediaResponse = {
}

export type InstallMediaRequest = {
	media: Media
}

export type InstallMediaResponse = {
}

export type PlayMediaRequest = {
	media: Media
}

export type PlayMediaResponse = {
}

export type GetInstallStatusRequest = {
	media: Media
}

export type GetInstallStatusResponse = {
	status: "not-installed" | "downloading" | "installing" | "installed" | "pending-update" | "updating" | "pending-uninstall" | "uninstalling" | "error"
}

export type GetLocalDataRequest = {
}

export type GetLocalDataResponse = {
}

export type SaveLocalDataRequest = {}

export type SaveLocalDataResponse = {}

export type LoadAllLocalDataRequest = {}

export type LoadAllLocalDataResponse = {}

export type GetConfigRequest = {}

export type GetConfigResponse = {}

export type SaveConfigRequest = {
	config: SprigganConfig
}

export type SaveConfigResponse = {
	success: boolean
}

export type GetOwnedDataStoresRequest = {}

export type GetOwnedDataStoresResponse = {
	dataStoreIds: string[]
}

export type GetPublishedMediaRequest = {
	dataStoreId: string
}

export type GetPublishedMediaResponse = {
	media: Media[]
}

export type PublishMediaRequest = {
	dataStoreId: string,
	media: Media,
	fee: number
}

export type PublishMediaResponse = {
	success: boolean,
	tx_id: string
}

export type CreateDataStoreRequest = {
	fee: number
}

export type CreateDataStoreResponse = {
	dataStoreId: string
}

export type GenerateTorrentsRequest = {
	media: Media,
	sourcePaths: { windows: string, mac: string, linux: string }
}

export type GenerateTorrentsResponse = {
	success: boolean
}

export type GetTorrentStatusRequest = {
	media: Media
}

export type GetTorrentStatusResponse = {
	status: "not-seeding" | "seeding" | "error"
}

export type MintNftCopiesRequest = {
	mintingConfig: {
		quantity: number,
		batchSize: number,
		metadataUris: string[],
		imageUris: string[],
		licenseUris: string[],
		publisherDid: string,
		royaltyAddress: string,
		royaltyPercentage: number,
		fee: number,
		salePrice: number,
	}
}

export type MintNftCopiesResponse = {}


export type SprigganRpcRequest = PingRequest | DownloadMediaRequest | InstallMediaRequest | PlayMediaRequest | GetInstallStatusRequest | GetLocalDataRequest | SaveLocalDataRequest | LoadAllLocalDataRequest | GetConfigRequest | SaveConfigRequest | GetOwnedDataStoresRequest | GetPublishedMediaRequest | PublishMediaRequest | CreateDataStoreRequest | GenerateTorrentsRequest | GetTorrentStatusRequest | MintNftCopiesRequest
export type SprigganRpcResponse = PingResponse | DownloadMediaResponse | InstallMediaResponse | PlayMediaResponse | GetInstallStatusResponse | GetLocalDataResponse | SaveLocalDataResponse | LoadAllLocalDataResponse | GetConfigResponse | SaveConfigResponse | GetOwnedDataStoresResponse | GetPublishedMediaResponse | PublishMediaResponse | CreateDataStoreResponse | GenerateTorrentsResponse | GetTorrentStatusResponse | MintNftCopiesResponse
export type SprigganRpcCallback = (params: SprigganRpcRequest) => Promise<SprigganRpcResponse>

interface IContext {
	ping: SprigganRpcCallback,
	downloadMedia: SprigganRpcCallback,
	installMedia: SprigganRpcCallback,
	playMedia: SprigganRpcCallback,
	getInstallStatus: SprigganRpcCallback,
	getLocalData: SprigganRpcCallback,
	saveLocalData: SprigganRpcCallback,
	loadAllLocalData: SprigganRpcCallback,
	getConfig: SprigganRpcCallback,
	saveConfig: SprigganRpcCallback,
	getOwnedDataStores: SprigganRpcCallback,
	getPublishedMedia: SprigganRpcCallback,
	publishMedia: SprigganRpcCallback,
	createDataStore: SprigganRpcCallback,
	generateTorrents: SprigganRpcCallback,
	getTorrentStatus: SprigganRpcCallback,
	mintNftCopies: SprigganRpcCallback,
	sprigganRpcResult?: SprigganRpcResponse | undefined;
	isRpcRequestPending: boolean;
}

/**
 * Context
 */
export const SprigganRpcContext = createContext<IContext>({} as IContext);

/**
 * Provider
 */
export const SprigganRpcContextProvider = ({ children }: {
	children: ReactNode | ReactNode[];
}) => {
	const [pending, setPending] = useState(false);
	const [result, setResult] = useState<SprigganRpcResponse>();

	const createSprigganRpcRequestHandler =
		(
			rpcRequest: SprigganRpcCallback
		) =>
			async (params: SprigganRpcRequest) => {
				try {
					setPending(true);
					const res = await rpcRequest(params);
					setResult(res);
					return res;
				} catch (err: any) {
					console.error("RPC request failed: ", err);
					const res = {
						valid: false,
						result: err?.message ?? err,
					};
					setResult(res);
					return res;
				} finally {
					setPending(false);
				}
			};

	const standardRequest = (method: string): SprigganRpcCallback => async (
		params: SprigganRpcRequest
	): Promise<SprigganRpcResponse> => {
		const resultRaw = await axios.post(`http://localhost:5235`, {
			jsonrpc: "2.0",
			id: + new Date(),
			method,
			params,
		}, { headers: { 'max-http-header-size': 1_000_000_000 } });
		if (resultRaw.data.result) {
			return {
				method,
				valid: resultRaw.data.result.success,
				result: resultRaw.data.result.result,
			};
		}
		return {
			method,
			valid: false,
			result: resultRaw.data.error,
		};

	};

	const ping = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.PING));
	const downloadMedia = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.DOWNLOAD_MEDIA));
	const installMedia = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.INSTALL_MEDIA));
	const playMedia = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.PLAY_MEDIA));
	const getInstallStatus = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GET_INSTALL_STATUS));
	const getLocalData = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GET_LOCAL_DATA));
	const saveLocalData = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.SAVE_LOCAL_DATA));
	const loadAllLocalData = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.LOAD_ALL_LOCAL_DATA));
	const getConfig = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GET_CONFIG));
	const saveConfig = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.SAVE_CONFIG));
	const getOwnedDataStores = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GET_OWNED_DATA_STORES));
	const getPublishedMedia = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GET_PUBLISHED_MEDIA));
	const publishMedia = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.PUBLISH_MEDIA));
	const createDataStore = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.CREATE_DATA_STORE));
	const generateTorrents = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GENERATE_TORRENTS));
	const getTorrentStatus = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GET_TORRENT_STATUS));
	const mintNftCopies = createSprigganRpcRequestHandler(standardRequest(SprigganMethods.MINT_NFT_COPIES));


	return (
		<SprigganRpcContext.Provider
			value={{
				ping,
				downloadMedia,
				installMedia,
				playMedia,
				getInstallStatus,
				getLocalData,
				saveLocalData,
				loadAllLocalData,
				getConfig,
				saveConfig,
				getOwnedDataStores,
				getPublishedMedia,
				publishMedia,
				createDataStore,
				generateTorrents,
				getTorrentStatus,
				mintNftCopies,
				sprigganRpcResult: result,
				isRpcRequestPending: pending,
			}}
		>
			{children}
		</SprigganRpcContext.Provider>
	);
};

export const useSprigganRpc = () => {
	const context = useContext(SprigganRpcContext);
	if (context === undefined) {
		throw new Error("useSprigganRpc must be used within a SprigganRpcContextProvider");
	}
	return context;
};
