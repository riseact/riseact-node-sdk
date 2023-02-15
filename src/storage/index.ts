import { StorageConfig } from '../types';
import { MemoryStorage } from './memory';
import { SqliteStorage } from './sqlite';

const initStorage = (config?: StorageConfig) => {
  switch (config?.type || 'memory') {
    case 'sqlite':
      return SqliteStorage(config);

    case 'memory':
      return MemoryStorage();

    case 'custom':
      if (!config?.custom) throw new Error('Custom storage driver is not provided');
      return config?.custom;

    default:
      throw new Error('Invalid storage type');
  }
};

export default initStorage;
