import { StorageConfig } from '../types';
import { FileStorage } from './file';
import { MemoryStorage } from './memory';

const initStorage = (config?: StorageConfig) => {
  switch (config?.type || 'memory') {
    case 'memory':
      console.info('[RISEACT-SDK] Using in-memory storage adapter');
      return MemoryStorage();

    case 'file':
      console.info('[RISEACT-SDK] Using file storage adapter');
      return FileStorage();

    case 'custom':
      if (!config?.adapters) throw new Error('Custom storage adapters are not provided');
      console.info('[RISEACT-SDK] Using custom storage adapter');
      return config?.adapters;

    default:
      throw new Error('Invalid storage type');
  }
};

export default initStorage;
