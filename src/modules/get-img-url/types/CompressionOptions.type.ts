import type imageCompression from 'browser-image-compression';

type CompressionOptions = Parameters<typeof imageCompression>[1];

export type { CompressionOptions };
