import { createContext, ReactNode, useContext, useState } from "react";

import { Media } from "../types/Media";

import axios from 'axios';
import { SPRIGGAN_METHODS } from "../constants";

/**
 * Types
 */
interface IFormattedRpcResponse {
	method?: string;
	valid: boolean;
	result: string;
}

export type SprigganRPCParams = {
	media: Media,
	productId: string,
}

type TRpcRequestCallback = (params: SprigganRPCParams) => Promise<void>;

interface IContext {
	sprigganRpc: {
		ping: TRpcRequestCallback,
		downloadMedia: TRpcRequestCallback,
<<<<<<< HEAD
		getLocalData: TRpcRequestCallback,
		saveLocalData: TRpcRequestCallback,
=======
		getMediaData: TRpcRequestCallback,
>>>>>>> ec5a6d41447a662e89780ae953ea05771e330ef7
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
				return {
					method,
					valid: true,
					result: JSON.stringify(result),
				};
			}
	}

	const sprigganRpc = {
		ping: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.PING)),
		downloadMedia: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.DOWNLOAD_MEDIA)),
		getLocalData: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.GET_LOCAL_DATA)),
		saveLocalData: _createSprigganRpcRequestHandler(standardRequest(SPRIGGAN_METHODS.SAVE_LOCAL_DATA)),

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
