import { WalletConnectModal, WalletConnectModalConfig } from '@walletconnect/modal';
import Client from '@walletconnect/sign-client';
import { PairingTypes, SessionTypes } from '@walletconnect/types';
import { getSdkError } from '@walletconnect/utils';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { METADATA, REQUIRED_NAMESPACES } from '../constants/wallet-connect';

interface WalletConnect {
	client?: Client;
	walletConnectModal?: WalletConnectModal;
	session?: SessionTypes.Struct;
	chainId: string;
	fingerprint?: string;
	connect: (pairing?: { topic: string }) => Promise<void>;
	disconnect: () => Promise<void>;
	isInitializing: boolean;
	pairings: PairingTypes.Struct[];
	accounts: string[];
}

export const WalletConnectContext = createContext<WalletConnect>({} as WalletConnect);

export interface WalletConnectProviderProps extends PropsWithChildren {
	projectId: string;
	relayUrl: string;
	chainId: string;
}

export function WalletConnectProvider({ projectId, relayUrl, chainId, children }: WalletConnectProviderProps) {
	const [walletConnectModal, setWalletConnectModal] = useState<WalletConnectModal>();
	const [client, setClient] = useState<Client>();
	const [pairings, setPairings] = useState<PairingTypes.Struct[]>([]);
	const [session, setSession] = useState<SessionTypes.Struct>();
	const [fingerprint, setFingerprint] = useState<string>();
	const [isInitializing, setIsInitializing] = useState(false);
	const [accounts, setAccounts] = useState<string[]>([]);

	const clearLocalStorage = () => {
		const savedFusions = localStorage.getItem('savedFusions');
		localStorage.clear();
		if (savedFusions) {
			localStorage.setItem('savedFusions', savedFusions);
		}
		if (window.indexedDB) {
			window.indexedDB.databases().then((databases) => {
				databases.forEach((db) => {
					if (db.name === 'WALLET_CONNECT_V2_INDEXED_DB') {
						window.indexedDB.open(db.name).onsuccess = (event) => {
							const dbResult = (event.target as IDBOpenDBRequest).result;
							const objectStore = dbResult.transaction('keyvaluestorage', 'readwrite').objectStore('keyvaluestorage');

							objectStore.clear();
							objectStore.getAllKeys().onsuccess = (eventKeys) => {
								console.log('keys', eventKeys);
							};
						};
					}
				});
			});
		}
	};

	const reset = useCallback(() => {
		setSession(undefined);
		setAccounts([]);
		clearLocalStorage();
		window.location.reload();
	}, []);

	const onSessionConnected = useCallback((sessionTemp: SessionTypes.Struct) => {
		const allNamespaceAccounts = Object.values(sessionTemp.namespaces)
			.map((namespace) => namespace.accounts)
			.flat();

		setSession(sessionTemp);
		setAccounts(allNamespaceAccounts);
		setFingerprint(allNamespaceAccounts[0].split(':')[2]);
	}, []);

	const connect = useCallback(
		async (pairing: any) => {
			if (!client) throw new Error('WalletConnect is not initialized');
			if (!walletConnectModal) throw new Error('walletConnectModal is not initialized');

			try {
				let connection = await client.connect({
					pairingTopic: pairing?.topic,
					requiredNamespaces: REQUIRED_NAMESPACES,
				});

				if (!connection.uri) {
					connection = await client.connect({
						pairingTopic: undefined,
						requiredNamespaces: REQUIRED_NAMESPACES,
					});
				}
				walletConnectModal.openModal({ uri: connection.uri });
				const sessionTemp = await connection.approval();
				onSessionConnected(sessionTemp);
				setPairings(client.pairing.getAll({ active: true }));
			} catch (e) {
				if (e) {
					console.error(e);
				}
			} finally {
				walletConnectModal.closeModal();
			}
		},
		[client, onSessionConnected, walletConnectModal]
	);

	const disconnect = useCallback(async () => {
		if (!client) throw new Error('WalletConnect is not initialized');
		if (!session) throw new Error('Session is not connected');

		await client.disconnect({
			topic: session.topic,
			reason: getSdkError('USER_DISCONNECTED'),
		});

		reset();
	}, [client, reset, session]);

	const subscribeToEvents = useCallback(
		async (clientTemp: Client) => {
			if (!clientTemp) throw new Error('WalletConnect is not initialized');

			clientTemp.on('session_update', ({ topic, params }) => {
				const { namespaces } = params;
				const sessionTemp = clientTemp.session.get(topic);
				const updatedSession = { ...sessionTemp, namespaces };
				onSessionConnected(updatedSession);
			});

			clientTemp.on('session_delete', () => reset());

			// Debug
			clientTemp.on('session_event', (...args) => console.log(args));
		},
		[onSessionConnected, reset]
	);

	const checkPersistedState = useCallback(
		async (clientTemp: Client) => {
			if (!clientTemp) throw new Error('WalletConnect is not initialized.');

			setPairings(clientTemp.pairing.getAll({ active: true }));

			if (session) return;

			if (clientTemp.session.length) {
				const lastKeyIndex = clientTemp.session.keys.length - 1;
				const sessionTemp = clientTemp.session.get(clientTemp.session.keys[lastKeyIndex]);

				onSessionConnected(sessionTemp);

				// return sessionTemp;
			}
		},
		[session, onSessionConnected]
	);

	const createClient = useCallback(async () => {
		try {
			console.log('Creating client...', METADATA);

			const clientTemp = await Client.init({
				relayUrl,
				projectId,
				metadata: METADATA,
			});

			const walletConnectModalTemp = new WalletConnectModal({
				projectId,
				chains: [chainId],
				walletConnectVersion: 2,
			} as WalletConnectModalConfig);

			setClient(clientTemp);
			setWalletConnectModal(walletConnectModalTemp);

			await subscribeToEvents(clientTemp);
			await checkPersistedState(clientTemp);
		} catch (error) {
			console.error('Error initializing WalletConnect client:', error);
		} finally {
			setIsInitializing(false);
		}
	}, [chainId, checkPersistedState, projectId, relayUrl, subscribeToEvents]);

	useEffect(() => {
		if (!client && !isInitializing) {
			setIsInitializing(true);
			createClient();
		}
	}, [client, createClient, isInitializing]);

	const value = useMemo(
		() => ({
			pairings,
			isInitializing,
			accounts,
			client,
			walletConnectModal,
			session,
			fingerprint,
			connect,
			disconnect,
		}),
		[pairings, isInitializing, accounts, client, walletConnectModal, session, fingerprint, connect, disconnect]
	);

	return (
		<WalletConnectContext.Provider
			value={{
				chainId,
				...value,
			}}
		>
			{children}
		</WalletConnectContext.Provider>
	);
}

export function useWalletConnect() {
	const context = useContext(WalletConnectContext);

	if (!context) throw new Error('Calls to `useWalletConnect` must be used within a `WalletConnectProvider`.');

	return context;
}
