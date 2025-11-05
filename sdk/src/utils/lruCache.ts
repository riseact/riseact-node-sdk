import { LRUCache } from 'lru-cache';

/* ---------------------------------- OAUTH --------------------------------- */

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

/* ----------------------------------- SID ---------------------------------- */

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

/* ----------------------------- REFRESH LOCK ------------------------------ */

export type RefreshLockState = {
  organizationDomain: string;
  status: 'pending' | 'completed';
  updatedAt: number;
};

export const refreshLockStore = new LRUCache<string, RefreshLockState>({
  max: 200,
  ttl: 5 * 60 * 1000, // 5 minutes
});

export const updateRefreshLock = (organizationDomain: string, status: RefreshLockState['status']) =>
  refreshLockStore.set(organizationDomain, {
    organizationDomain,
    status,
    updatedAt: Date.now(),
  });

export const deleteRefreshLock = (organizationDomain: string) => refreshLockStore.delete(organizationDomain);

export const getRefreshLockState = (organizationDomain: string): RefreshLockState | undefined => refreshLockStore.get(organizationDomain);
