import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from "react";

import { CreateDataStoreRequest, CreateDataStoreResponse, DownloadMediaRequest, DownloadMediaResponse, GenerateTorrentsRequest, GenerateTorrentsResponse, GetConfigRequest, GetConfigResponse, GetInstallStatusRequest, GetInstallStatusResponse, GetLocalDataRequest, GetLocalDataResponse, GetOwnedDataStoresRequest, GetOwnedDataStoresResponse, GetPublishedMediaRequest, GetPublishedMediaResponse, GetTorrentStatusRequest, GetTorrentStatusResponse, InstallMediaRequest, InstallMediaResponse, LoadAllLocalDataRequest, LoadAllLocalDataResponse, MintNftCopiesRequest, MintNftCopiesResponse, PingRequest, PingResponse, PlayMediaRequest, PlayMediaResponse, PublishMediaRequest, PublishMediaResponse, SaveConfigRequest, SaveConfigResponse, SaveLocalDataRequest, SaveLocalDataResponse, SprigganConfig } from '../types/spriggan/SprigganRpcTypes';


export type SprigganRpcRequest = PingRequest | DownloadMediaRequest | InstallMediaRequest | PlayMediaRequest | GetInstallStatusRequest | GetLocalDataRequest | SaveLocalDataRequest | LoadAllLocalDataRequest | GetConfigRequest | SaveConfigRequest | GetOwnedDataStoresRequest | GetPublishedMediaRequest | PublishMediaRequest | CreateDataStoreRequest | GenerateTorrentsRequest | GetTorrentStatusRequest | MintNftCopiesRequest
export type SprigganRpcResponse = PingResponse | DownloadMediaResponse | InstallMediaResponse | PlayMediaResponse | GetInstallStatusResponse | GetLocalDataResponse | SaveLocalDataResponse | LoadAllLocalDataResponse | GetConfigResponse | SaveConfigResponse | GetOwnedDataStoresResponse | GetPublishedMediaResponse | PublishMediaResponse | CreateDataStoreResponse | GenerateTorrentsResponse | GetTorrentStatusResponse | MintNftCopiesResponse
export type SprigganRpcFormattedResponse = {
	method: string,
	valid: boolean,
	result: SprigganRpcResponse
}
export type SprigganRpcCallback = (params: SprigganRpcRequest) => Promise<SprigganRpcFormattedResponse>

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
	config: SprigganConfig,
	sprigganRpcResult?: SprigganRpcFormattedResponse | undefined;
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
	const [result, setResult] = useState<SprigganRpcFormattedResponse>();

	const [config, setConfig] = useState<SprigganConfig>({} as SprigganConfig);

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
						method: "unknown",
					};
					setResult(res);
					return res;
				} finally {
					setPending(false);
				}
			};

	const standardRequest = (method: string): SprigganRpcCallback => async (
		params: SprigganRpcRequest
	): Promise<SprigganRpcFormattedResponse> => {
		const resultRaw = await axios.post(`http://localhost:5235`, {
			jsonrpc: "2.0",
			id: + new Date(),
			method,
			params,
		}, { headers: { 'max-http-header-size': 1_000_000_000 } });
		if (method === "getConfig") {
			setConfig(resultRaw.data.result.config as SprigganConfig);
		} else if (method === "saveConfig") {
			setConfig(params as SprigganConfig);
		}
		if (resultRaw.data.result) {
			console.log("resultRaw", resultRaw);
			return {
				method,
				valid: resultRaw.status === 200,
				result: resultRaw.data.result as SprigganRpcResponse,
			} as SprigganRpcFormattedResponse;
		}
		return {
			method,
			valid: false,
			result: { message: resultRaw.data.error } as SprigganRpcResponse,
		} as SprigganRpcFormattedResponse;

	};

	const ping = createSprigganRpcRequestHandler(standardRequest("ping"));
	const downloadMedia = createSprigganRpcRequestHandler(standardRequest("downloadMedia"));
	const installMedia = createSprigganRpcRequestHandler(standardRequest("installMedia"));
	const playMedia = createSprigganRpcRequestHandler(standardRequest("playMedia"));
	const getInstallStatus = createSprigganRpcRequestHandler(standardRequest("getInstallStatus"));
	const getLocalData = createSprigganRpcRequestHandler(standardRequest("getLocalData"));
	const saveLocalData = createSprigganRpcRequestHandler(standardRequest("saveLocalData"));
	const loadAllLocalData = createSprigganRpcRequestHandler(standardRequest("loadAllLocalData"));
	const getConfig = createSprigganRpcRequestHandler(standardRequest("getConfig"));
	const saveConfig = createSprigganRpcRequestHandler(standardRequest("saveConfig"));
	const getOwnedDataStores = createSprigganRpcRequestHandler(standardRequest("getOwnedDataStores"));
	const getPublishedMedia = createSprigganRpcRequestHandler(standardRequest("getPublishedMedia"));
	const publishMedia = createSprigganRpcRequestHandler(standardRequest("publishMedia"));
	const createDataStore = createSprigganRpcRequestHandler(standardRequest("createDataStore"));
	const generateTorrents = createSprigganRpcRequestHandler(standardRequest("generateTorrents"));
	const getTorrentStatus = createSprigganRpcRequestHandler(standardRequest("getTorrentStatus"));
	const mintNftCopies = createSprigganRpcRequestHandler(standardRequest("mintNftCopies"));


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
				config,
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
