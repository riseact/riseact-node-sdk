import { StorageConfig } from '../types';
import { MemoryDriver } from './memory';
import { SqliteDriver } from './sqlite';

const initStorage = (config?: StorageConfig) => {
  switch (config?.type || 'memory') {
    case 'sqlite':
      return SqliteDriver(config);

    case 'memory':
      return MemoryDriver();

    case 'custom':
      if (!config?.custom) throw new Error('Custom storage driver is not provided');
      return config?.custom;

    default:
      throw new Error('Invalid storage type');
  }
};

export default initStorage;
