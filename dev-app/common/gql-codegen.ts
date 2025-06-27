import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://core.riseact.org/graphql/',
  documents: ['../server/src/**/*', '../client/src/**/*', 'src/**/*'],
  emitLegacyCommonJSImports: true,
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
