import { StorageConfig } from '../types';
import { FileStorage } from './file';
import { MemoryStorage } from './memory';

const initStorage = (config?: StorageConfig) => {
  switch (config?.type || 'memory') {
    case 'memory':
      return MemoryStorage();

    case 'file':
      return FileStorage();

    case 'custom':
      if (!config?.adapters) throw new Error('Custom storage adapters are not provided');
      return config?.adapters;

    default:
      throw new Error('Invalid storage type');
  }
};

export default initStorage;
