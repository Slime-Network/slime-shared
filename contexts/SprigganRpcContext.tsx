import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from "react";

import { SprigganMethods } from "../constants";
import { Media } from "../types/Media";


/**
 * Types
 */
export interface IFormattedRpcResponse {
	method?: string;
	valid: boolean;
	result: any;
}

export type SprigganConfig = {
	torrentsPath: string
}

export type SprigganRPCParams = {
	media: Media,
	productId: string,
	dataStoreId: string,
	sourcePaths: { windows: string, mac: string, linux: string },
	config: SprigganConfig,
	fee: number,
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

export type TRpcRequestCallback = (params: SprigganRPCParams) => Promise<IFormattedRpcResponse>;

interface IContext {
	sprigganRpc: {
		ping: TRpcRequestCallback,
		downloadMedia: TRpcRequestCallback,
		getLocalData: TRpcRequestCallback,
		saveLocalData: TRpcRequestCallback,
		loadAllLocalData: TRpcRequestCallback,
		getConfig: TRpcRequestCallback,
		saveConfig: TRpcRequestCallback,
		getOwnedDataStores: TRpcRequestCallback,
		getPublishedMedia: TRpcRequestCallback,
		publishMedia: TRpcRequestCallback,
		createDataStore: TRpcRequestCallback,
		generateTorrents: TRpcRequestCallback,
		getTorrentStatus: TRpcRequestCallback,
		mintNftCopies: TRpcRequestCallback,
	},
	sprigganRpcResult?: IFormattedRpcResponse | null;
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
	const [result, setResult] = useState<IFormattedRpcResponse | null>();

	const createSprigganRpcRequestHandler =
		(
			rpcRequest: (
				params: SprigganRPCParams
			) => Promise<IFormattedRpcResponse>
		) =>
			async (params: SprigganRPCParams) => {
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

	const standardRequest = (method: string): (params: SprigganRPCParams) => Promise<IFormattedRpcResponse> => async (
		params: SprigganRPCParams
	): Promise<IFormattedRpcResponse> => {
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

	const sprigganRpc = {
		ping: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.PING)),
		downloadMedia: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.DOWNLOAD_MEDIA)),
		getLocalData: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GET_LOCAL_DATA)),
		saveLocalData: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.SAVE_LOCAL_DATA)),
		loadAllLocalData: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.LOAD_ALL_LOCAL_DATA)),
		getConfig: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GET_CONFIG)),
		saveConfig: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.SAVE_CONFIG)),
		getOwnedDataStores: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GET_OWNED_DATA_STORES)),
		getPublishedMedia: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GET_PUBLISHED_MEDIA)),
		publishMedia: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.PUBLISH_MEDIA)),
		createDataStore: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.CREATE_DATA_STORE)),
		generateTorrents: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GENERATE_TORRENTS)),
		getTorrentStatus: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GET_TORRENT_STATUS)),
		mintNftCopies: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.MINT_NFT_COPIES)),

	};

	return (
		<SprigganRpcContext.Provider
			value={{
				sprigganRpc,
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
