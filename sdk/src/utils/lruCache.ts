import { LRUCache } from 'lru-cache';

export type PkceRecord = { codeVerifier: string; organizationDomain: string };

export const pkceStore = new LRUCache<string, PkceRecord>({
  max: 100,
  ttl: 1 * 60 * 1000, // 1 minutes
});

export function savePkce(state: string, rec: PkceRecord) {
  console.info('Saving PKCE record', { state, rec });
  pkceStore.set(state, rec);
}

export function popPkce(state: string): PkceRecord | undefined {
  const rec = pkceStore.get(state);
  if (rec) pkceStore.delete(state);
  return rec;
}

export type SidRecord = { organizationDomain: string; clientToken: string };

export const sidStore = new LRUCache<string, SidRecord>({
  max: 100,
  ttl: 1 * 60 * 1000, // 1 minutes
});

export function saveSid(state: string, rec: SidRecord) {
  console.info('Saving SID record', { state, rec });
  sidStore.set(state, rec);
}

export function popSid(state: string): SidRecord | undefined {
  const rec = sidStore.get(state);
  if (rec) sidStore.delete(state);
  return rec;
}
