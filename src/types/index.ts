export interface ReasonItem {
  id: number;
  title: string;
  thaiTitle?: string;
  description: string;
  iconName: string;
  romanticQuote: string;
  thaiQuote?: string;
}

export interface MemoryPhoto {
  id: string;
  title: string;
  date: string;
  caption: string;
  imageUrl: string;
  tag: string;
}

export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  code: string;
  unlocked: boolean;
}

export type CameraPreset = 'cake' | 'overview' | 'cinematic';
