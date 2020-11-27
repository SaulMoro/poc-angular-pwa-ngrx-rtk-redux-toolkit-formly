export interface SeoConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  route?: string;
  robots?: string;
  image?: string;
  og_image?: string;
  twitter_image?: string;
  locale?: string;
  locale_alternate?: string;
  article?: SeoArticle;
  author?: SeoProfile;
}

export interface SeoArticle {
  published_time: string;
  modified_time: string;
  tag: string[];
  author: string[];
}

export interface SeoProfile {
  first_name: string;
  last_name: string;
  username: string;
  gender: 'male' | 'female';
}
