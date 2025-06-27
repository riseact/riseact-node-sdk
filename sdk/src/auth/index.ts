import { RiseactAuth, RiseactConfig, StorageAdapters } from '../types';
import initAuthMiddleware from './authMiddleware';

export function initAuth(config: RiseactConfig, storage: StorageAdapters): RiseactAuth {
  return {
    authMiddleware: initAuthMiddleware(config, storage),
  };
}
