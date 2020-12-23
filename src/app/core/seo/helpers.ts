import { environment } from '@environments/environment';

export const getAbsoluteImageUrl = (image: string): string =>
  image.startsWith('assets') ? `${environment.url}/${image}` : image;

export const getTwitterImageUrl = (image: string) => getAbsoluteImageUrl(`assets/banners${image}/twitter.png`);

export const getOGImageUrl = (image: string) => getAbsoluteImageUrl(`assets/banners${image}/og.png`);
