import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from "react";

import { CreateDataStoreRequest, CreateDataStoreResponse, DownloadMediaRequest, DownloadMediaResponse, GenerateTorrentsRequest, GenerateTorrentsResponse, GetConfigRequest, GetConfigResponse, GetInstallStatusRequest, GetInstallStatusResponse, GetLocalDataRequest, GetLocalDataResponse, GetOwnedDataStoresRequest, GetOwnedDataStoresResponse, GetPublishedMediaRequest, GetPublishedMediaResponse, GetTorrentStatusRequest, GetTorrentStatusResponse, InstallMediaRequest, InstallMediaResponse, LoadAllLocalDataRequest, LoadAllLocalDataResponse, MintNftCopiesRequest, MintNftCopiesResponse, PingRequest, PingResponse, PlayMediaRequest, PlayMediaResponse, PublishMediaRequest, PublishMediaResponse, SaveConfigRequest, SaveConfigResponse, SaveLocalDataRequest, SaveLocalDataResponse, GostiConfig } from '../types/gosti/GostiRpcTypes';


export type GostiRpcRequest = PingRequest | DownloadMediaRequest | InstallMediaRequest | PlayMediaRequest | GetInstallStatusRequest | GetLocalDataRequest | SaveLocalDataRequest | LoadAllLocalDataRequest | GetConfigRequest | SaveConfigRequest | GetOwnedDataStoresRequest | GetPublishedMediaRequest | PublishMediaRequest | CreateDataStoreRequest | GenerateTorrentsRequest | GetTorrentStatusRequest | MintNftCopiesRequest
export type GostiRpcResponse = PingResponse | DownloadMediaResponse | InstallMediaResponse | PlayMediaResponse | GetInstallStatusResponse | GetLocalDataResponse | SaveLocalDataResponse | LoadAllLocalDataResponse | GetConfigResponse | SaveConfigResponse | GetOwnedDataStoresResponse | GetPublishedMediaResponse | PublishMediaResponse | CreateDataStoreResponse | GenerateTorrentsResponse | GetTorrentStatusResponse | MintNftCopiesResponse
export type GostiRpcFormattedResponse = {
	method: string,
	valid: boolean,
	result: GostiRpcResponse
}
export type GostiRpcCallback = (params: GostiRpcRequest) => Promise<GostiRpcFormattedResponse>

interface IContext {
	ping: GostiRpcCallback,
	downloadMedia: GostiRpcCallback,
	deleteMedia: GostiRpcCallback,
	installMedia: GostiRpcCallback,
	uninstallMedia: GostiRpcCallback,
	playMedia: GostiRpcCallback,
	getInstallStatus: GostiRpcCallback,
	getLocalData: GostiRpcCallback,
	saveLocalData: GostiRpcCallback,
	loadAllLocalData: GostiRpcCallback,
	getConfig: GostiRpcCallback,
	saveConfig: GostiRpcCallback,
	getOwnedDataStores: GostiRpcCallback,
	getPublishedMedia: GostiRpcCallback,
	publishMedia: GostiRpcCallback,
	createDataStore: GostiRpcCallback,
	generateTorrents: GostiRpcCallback,
	getTorrentStatus: GostiRpcCallback,
	mintNftCopies: GostiRpcCallback,
	config: GostiConfig,
	gostiRpcResult?: GostiRpcFormattedResponse | undefined;
	isRpcRequestPending: boolean;
}

/**
 * Context
 */
export const GostiRpcContext = createContext<IContext>({} as IContext);

/**
 * Provider
 */
export const GostiRpcContextProvider = ({ children }: {
	children: ReactNode | ReactNode[];
}) => {
	const [pending, setPending] = useState(false);
	const [result, setResult] = useState<GostiRpcFormattedResponse>();

	const [config, setConfig] = useState<GostiConfig>({} as GostiConfig);

	const createGostiRpcRequestHandler =
		(
			rpcRequest: GostiRpcCallback
		) =>
			async (params: GostiRpcRequest) => {
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
						method: "unknown",
					};
					setResult(res);
					return res;
				} finally {
					setPending(false);
				}
			};

	const standardRequest = (method: string): GostiRpcCallback => async (
		params: GostiRpcRequest
	): Promise<GostiRpcFormattedResponse> => {
		const resultRaw = await axios.post(`http://localhost:5235`, {
			jsonrpc: "2.0",
			id: + new Date(),
			method,
			params,
		}, { headers: { 'max-http-header-size': 1_000_000_000 } });
		if (method === "getConfig") {
			setConfig(resultRaw.data.result.config as GostiConfig);
		} else if (method === "saveConfig") {
			setConfig(params as GostiConfig);
		}
		if (resultRaw.data.result) {
			console.log("resultRaw", resultRaw);
			return {
				method,
				valid: resultRaw.status === 200,
				result: resultRaw.data.result as GostiRpcResponse,
			} as GostiRpcFormattedResponse;
		}
		return {
			method,
			valid: false,
			result: { message: resultRaw.data.error } as GostiRpcResponse,
		} as GostiRpcFormattedResponse;

	};

	const ping = createGostiRpcRequestHandler(standardRequest("ping"));
	const downloadMedia = createGostiRpcRequestHandler(standardRequest("downloadMedia"));
	const deleteMedia = createGostiRpcRequestHandler(standardRequest("deleteMedia"));
	const installMedia = createGostiRpcRequestHandler(standardRequest("installMedia"));
	const uninstallMedia = createGostiRpcRequestHandler(standardRequest("uninstallMedia"));
	const playMedia = createGostiRpcRequestHandler(standardRequest("playMedia"));
	const getInstallStatus = createGostiRpcRequestHandler(standardRequest("getInstallStatus"));
	const getLocalData = createGostiRpcRequestHandler(standardRequest("getLocalData"));
	const saveLocalData = createGostiRpcRequestHandler(standardRequest("saveLocalData"));
	const loadAllLocalData = createGostiRpcRequestHandler(standardRequest("loadAllLocalData"));
	const getConfig = createGostiRpcRequestHandler(standardRequest("getConfig"));
	const saveConfig = createGostiRpcRequestHandler(standardRequest("saveConfig"));
	const getOwnedDataStores = createGostiRpcRequestHandler(standardRequest("getOwnedDataStores"));
	const getPublishedMedia = createGostiRpcRequestHandler(standardRequest("getPublishedMedia"));
	const publishMedia = createGostiRpcRequestHandler(standardRequest("publishMedia"));
	const createDataStore = createGostiRpcRequestHandler(standardRequest("createDataStore"));
	const generateTorrents = createGostiRpcRequestHandler(standardRequest("generateTorrents"));
	const getTorrentStatus = createGostiRpcRequestHandler(standardRequest("getTorrentStatus"));
	const mintNftCopies = createGostiRpcRequestHandler(standardRequest("mintNftCopies"));


	return (
		<GostiRpcContext.Provider
			value={{
				ping,
				downloadMedia,
				deleteMedia,
				installMedia,
				uninstallMedia,
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
				config,
				gostiRpcResult: result,
				isRpcRequestPending: pending,
			}}
		>
			{children}
		</GostiRpcContext.Provider>
	);
};

export const useGostiRpc = () => {
	const context = useContext(GostiRpcContext);
	if (context === undefined) {
		throw new Error("useGostiRpc must be used within a GostiRpcContextProvider");
	}
	return context;
};
