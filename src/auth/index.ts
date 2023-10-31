import { RiseactAuth, RiseactConfig, StorageDriver } from '../types';
import initAuthMiddleware from './authMiddleware';

export function initAuth(config: RiseactConfig, storage: StorageDriver): RiseactAuth {
  return {
    authMiddleware: initAuthMiddleware(config, storage),
  };
}
