import axios from "axios";

import {
	createContext,
	ReactNode,
	useContext,
	useState,
} from "react";
import { Media } from "../types/Media";
import { SearchParams } from "../types/SearchTypes";

/**
 * Types
 */
interface IContext {
	apiUrl: string,
	setApiUrl: React.Dispatch<React.SetStateAction<string>>,
	search: {
		search: SearchCallback,
		mostRecent: SearchCallback,
		installData: SingleItemCallback,
	}
}

type SearchCallback = (params: SearchParams) => Promise<Media[]>;
type SingleItemCallback = (productId: string) => Promise<Media>;

/**
 * Context
 */
export const SearchContext = createContext<IContext>({} as IContext);

/**
 * Provider
 */
export const SearchContextProvider = ({children}: {
	children: ReactNode | ReactNode[];
}) => {
	const [apiUrl, setApiUrl] = useState('http://localhost:5233');

	const hitsToGameList = (hits: any) => {
		const games = new Array<Media>()
		if (hits) {
			hits.forEach((hit: any) => {
				games.push(hit._source as Media)
			});
		}
		return games
	}

	const search = {
		search: async (params: SearchParams) => {
			const response = await axios.get(`${apiUrl}/listings/search`, { params: { titleTerm: params.titleTerm } })
			return hitsToGameList(response.data.hits.hits);
		},
		mostRecent: async (params: SearchParams) => {
			const response = await axios.get(`${apiUrl}/listings/mostRecent`, { params: {} })
			return hitsToGameList(response.data.hits.hits);
		},
		installData: async (productId: string) => {
			const response = await axios.get(`${apiUrl}/listings/getInstallData`, { params: {productId: productId} })
			return response.data.hits.hits[0];
		}
	}

	return (
		<SearchContext.Provider
			value={{
				apiUrl,
				setApiUrl,
				search,
			}}
			>
			{children}
		</SearchContext.Provider>
	);
}

export const useSearch = () => {
	const context = useContext(SearchContext);
	if (context === undefined) {
		throw new Error(
			"useSearch must be used within a SearchContextProvider"
		);
	}
	return context;
}
