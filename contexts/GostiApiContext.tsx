import { invoke } from "@tauri-apps/api";
import React, { ReactNode, createContext } from "react";

import { GostiConfig } from "../types/gosti/GostiRpcTypes";


/**
 * Types
 */
interface IContext {
    gostiConfig: GostiConfig,
    fetchGostiConfig: () => Promise<GostiConfig>,
    setGostiConfig: React.Dispatch<React.SetStateAction<GostiConfig>>,
    signNostrMessage: (params: { message: string }) => Promise<string>,
    addNostrKeypair: (params: { publicKey: string, privateKey: string }) => Promise<string>,
    getOperatingSystem: () => Promise<string>,
}

/**
 * Context
 */
export const GostiApiContext = createContext<IContext>({} as IContext);

/**
 * Provider
 */
export const GostiApiContextProvider = ({ children }: {
    children: ReactNode | ReactNode[];
}) => {
    const [gostiConfig, setGostiConfig] = React.useState<GostiConfig>({
        nostrRelays: ["ws://localhost:8008"],
        activeMarketplace: { displayName: "LocalHost", url: "http://localhost:5233" },
        installsPath: "./gosti-data/installs/",
        marketplaces: [{ displayName: "Localhost", url: "http://localhost:5233" }, { displayName: "Gosti Marketplace", url: "http://api.spriggan.club" }],
        mediaDataPath: "./gosti-data/media/",
        mintingDataPath: "./gosti-data/minting/",
        torrentsPath: "./gosti-data/torrents/",
        identity: { activeDID: "", currentNostrPublicKey: "", proof: "" },
        default: true
    });

    React.useEffect(() => {
        const fetchConfig = async () => {
            const configResponse: any = await invoke("get_config");
            console.log("get_config", configResponse);
            setGostiConfig(configResponse.result);
        };

        if (gostiConfig.default) {
            console.log("fetchConfig");
            fetchConfig();
        }
    }, [gostiConfig.default]);

    const fetchGostiConfig = async () => {
        if (gostiConfig) {
            return gostiConfig;
        }
        const configResponse: any = await invoke("get_config");
        console.log("fetchGostiConfig", configResponse);
        setGostiConfig(configResponse.result);
        return configResponse.result;
    };

    const signNostrMessage = async (params: { message: string }) => {
        let sig = "";
        try {
            sig = await invoke("get_sign_nostr_message", params);
        }
        catch (e) {
            console.error(e);
        }
        return sig;
    };

    const addNostrKeypair = async (params: { publicKey: string, privateKey: string }) => {
        let result = "";
        try {
            result = await invoke("add_nostr_keypair", params);
        }
        catch (e) {
            console.error(e);
        }
        return result;
    };

    const getOperatingSystem = async () => {
        let os = "Windows";
        try {
            os = await invoke("get_operating_system");
        }
        catch (e) {
            console.error(e);
        }
        return os;
    };

    return (
        <GostiApiContext.Provider
            value={{
                gostiConfig,
                fetchGostiConfig,
                setGostiConfig,
                signNostrMessage,
                addNostrKeypair,
                getOperatingSystem
            }}
        >
            {children}
        </GostiApiContext.Provider >
    );
};

export const useGostiApi = () => {
    const context = React.useContext(GostiApiContext);
    if (context === undefined) {
        throw new Error(
            "useGostiApi must be used within a GostiApiContextProvider"
        );
    }
    return context;
};
