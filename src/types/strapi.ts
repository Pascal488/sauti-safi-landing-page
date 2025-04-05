// Common Strapi response structure
export interface StrapiResponse<T> {
  data: StrapiData<T>;
  meta: StrapiMeta;
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiCollectionResponse<T> {
  data: StrapiData<T>[];
  meta: StrapiMeta;
}

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// Image type
export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail?: ImageFormat;
        small?: ImageFormat;
        medium?: ImageFormat;
        large?: ImageFormat;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: any | null;
      createdAt: string;
      updatedAt: string;
    };
  };
}

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
  url: string;
}

// Hero section type
export interface HeroContent {
  title: string;
  subtitle: string;
  buttonText: string;
  mainImage: StrapiImage;
}

// Feature type
export interface Feature {
  title: string;
  description: string;
  icon: StrapiImage;
  bgColor: string;
}

// Benefit type
export interface Benefit {
  title: string;
  description: string;
  icon: StrapiImage;
}

// Timeline item type
export interface TimelineItem {
  number: string;
  title: string;
  description: string;
}