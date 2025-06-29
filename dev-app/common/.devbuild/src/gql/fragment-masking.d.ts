import { TypedDocumentNode as DocumentNode, ResultOf } from '@graphql-typed-document-node/core';
export type FragmentType<TDocumentType extends DocumentNode<any, any>> = TDocumentType extends DocumentNode<infer TType, any> ? TType extends {
    ' $fragmentName'?: infer TKey;
} ? TKey extends string ? {
    ' $fragmentRefs'?: {
        [key in TKey]: TType;
    };
} : never : never : never;
export declare function useFragment<TType>(_documentNode: DocumentNode<TType, any>, fragmentType: FragmentType<DocumentNode<TType, any>>): TType;
export declare function useFragment<TType>(_documentNode: DocumentNode<TType, any>, fragmentType: FragmentType<DocumentNode<TType, any>> | null | undefined): TType | null | undefined;
export declare function useFragment<TType>(_documentNode: DocumentNode<TType, any>, fragmentType: ReadonlyArray<FragmentType<DocumentNode<TType, any>>>): ReadonlyArray<TType>;
export declare function useFragment<TType>(_documentNode: DocumentNode<TType, any>, fragmentType: ReadonlyArray<FragmentType<DocumentNode<TType, any>>> | null | undefined): ReadonlyArray<TType> | null | undefined;
export declare function makeFragmentData<F extends DocumentNode, FT extends ResultOf<F>>(data: FT, _fragment: F): FragmentType<F>;
