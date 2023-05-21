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
	datastoreId: string,
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
					setResult(await rpcRequest(params));
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

	const standardRequest = (method: string): (params: SprigganRPCParams) => Promise<IFormattedRpcResponse> => async (
		params: SprigganRPCParams
	): Promise<IFormattedRpcResponse> => {
		const resultRaw = await axios.post(`http://api.spriggan.club`, {
			jsonrpc: "2.0",
			id: + new Date(),
			method,
			params,
		});
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
		getConfig: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GET_CONFIG)),
		saveConfig: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.SAVE_CONFIG)),
		getOwnedDatastores: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GET_OWNED_DATASTORES)),
		getPublishedMedia: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GET_PUBLISHED_MEDIA)),
		publishMedia: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.PUBLISH_MEDIA)),
		createDatastore: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.CREATE_DATASTORE)),
		generateTorrents: createSprigganRpcRequestHandler(standardRequest(SprigganMethods.GENERATE_TORRENTS)),
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
