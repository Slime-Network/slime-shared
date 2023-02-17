import { createContext, ReactNode, useContext, useState } from "react";

import Media from "../types/Media";

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

type SprigganRPCParams = {
	media: Media,
}

type TRpcRequestCallback = (params: {media: Media}) => Promise<void>;

interface IContext {
	sprigganRpc: {
		ping: TRpcRequestCallback,
		downloadMedia: TRpcRequestCallback,
	},
	rpcResult?: IFormattedRpcResponse | null;
	isRpcRequestPending: boolean;
}



/**
 * Context
 */
export const SprigganRpcContext = createContext<IContext>({} as IContext);

/**
 * Provider
 */
export function SprigganRpcContextProvider({children}: {
	children: ReactNode | ReactNode[];
}) {
	const [pending, setPending] = useState(false);
	const [result, setResult] = useState<IFormattedRpcResponse | null>();

	const _createSprigganRpcRequestHandler =
		(
			rpcRequest: (
				params: {media: Media}
			) => Promise<IFormattedRpcResponse>
		) =>
		async (params: {media: Media}) => {
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
				const result = await axios.post(`http://localhost:5235/`, {
					jsonrpc: "2.0",
					method: method,
					id: "ping",
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
	};

	return (
		<SprigganRpcContext.Provider
		value={{
			sprigganRpc,
			rpcResult: result,
			isRpcRequestPending: pending,
		}}
		>
			{children}
		</SprigganRpcContext.Provider>
	);
}

export function useSprigganRpc() {
	const context = useContext(SprigganRpcContext);
	if (context === undefined) {
		throw new Error("useSprigganRpc must be used within a SprigganRpcContextProvider");
	}
	return context;
}
