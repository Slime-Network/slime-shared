import { sha256 } from '@noble/hashes/sha256';
import { bytesToHex } from '@noble/hashes/utils';

export const verifiedSymbol = Symbol('verified');

export interface Event {
	kind: number;
	tags: string[][];
	content: string;
	created_at: number;
	pubkey: string;
	id: string;
	sig: string;
}
export type NostrEvent = Event;

export function serializeEvent(evt: Event): string {
	return JSON.stringify([0, evt.pubkey, evt.created_at, evt.kind, evt.tags, evt.content]);
}

export function getEventHash(event: Event): string {
	const eventHash = sha256(new TextEncoder().encode(serializeEvent(event)));
	return bytesToHex(eventHash);
}
