import { createContext, ReactNode, useContext, useState } from "react";

import { Media } from "../types/Media";

import axios from 'axios';
import { SPRIGGAN_METHODS } from "../constants";

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
	datastoreId: string,
	sourcePaths: {windows: string, mac: string, linux: string},
	config: SprigganConfig,
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

export type TRpcRequestCallback = (params: SprigganRPCParams) => Promise<void>;

interface IContext {
	sprigganRpc: {
		ping: TRpcRequestCallback,
		downloadMedia: TRpcRequestCallback,
		getLocalData: TRpcRequestCallback,
		saveLocalData: TRpcRequestCallback,
		getConfig: TRpcRequestCallback,
		saveConfig: TRpcRequestCallback,
		getOwnedDatastores: TRpcRequestCallback,
		getPublishedMedia: TRpcRequestCallback,
		publishMedia: TRpcRequestCallback,
		createDatastore: TRpcRequestCallback,
		generateTorrents: TRpcRequestCallback,
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
export const SprigganRpcContextProvider = ({children}: {
	children: ReactNode | ReactNode[];
}) => {
	const [pending, setPending] = useState(false);
	const [result, setResult] = useState<IFormattedRpcResponse | null>();

	const _createSprigganRpcRequestHandler =
		(
			rpcRequest: (
				params: SprigganRPCParams
			) => Promise<IFormattedRpcResponse>
		) =>
		async (params: SprigganRPCParams) => {
			try {
				setPending(true);
				const result = await rpcRequest(params);
				console.log("here", result);
				setResult(result);
			} catch (err: any) {
				console.error("RPC request failed: ", err);
				setResult({
					valid: false,
					result: err?.message ?? err,
				});
			} finally {
				setPending(false);
			}
		};

	const standardRequest = (method: string): (params: SprigganRPCParams) => Promise<IFormattedRpcResponse> => {
		return async (
			params: SprigganRPCParams
			): Promise<IFormattedRpcResponse> => {
				const result = await axios.post(`http://localhost:5235`, {
					jsonrpc: "2.0",
					id: + new Date(),
					method: method,
					params: params,
				});
				if (result.data.result) {
					return {
						method,
						valid: result.data.result.success,
						result: result.data.result.result,
					};
				} else {
					return {
						method,
						valid: false,
						result: result.data.error,
					};
				}
			}
	}

	const sprigganRpc = {
		ping: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.PING)),
		downloadMedia: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.DOWNLOAD_MEDIA)),
		getLocalData: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.GET_LOCAL_DATA)),
		saveLocalData: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.SAVE_LOCAL_DATA)),
		getConfig: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.GET_CONFIG)),
		saveConfig: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.SAVE_CONFIG)),
		getOwnedDatastores: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.GET_OWNED_DATASTORES)),
		getPublishedMedia: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.GET_PUBLISHED_MEDIA)),
		publishMedia: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.PUBLISH_MEDIA)),
		createDatastore: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.CREATE_DATASTORE)),
		generateTorrents: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.GENERATE_TORRENTS)),
		mintNftCopies: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.MINT_NFT_COPIES)),

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
}

export const useSprigganRpc = () => {
	const context = useContext(SprigganRpcContext);
	if (context === undefined) {
		throw new Error("useSprigganRpc must be used within a SprigganRpcContextProvider");
	}
	return context;
}
