import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Observable } from 'rxjs';

import { SeoArticle, SeoConfig, SeoProfile } from './types';
import { getAbsoluteImageUrl, getOGImageUrl, getTwitterImageUrl } from './helpers';

export const defaultConfig: Partial<SeoConfig> = {
  robots: 'index, follow',
  image: getAbsoluteImageUrl('assets/img/feature.png'),
  route: '/',
};

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private appConfig: Partial<SeoConfig> = { ...defaultConfig };
  private config: BehaviorSubject<SeoConfig> = new BehaviorSubject<SeoConfig>({ ...defaultConfig });

  constructor(private title: Title, private meta: Meta, private translocoService: TranslocoService) {
    this.translocoService.selectTranslateObject('APP_SEO').subscribe((translatedSEO) => {
      this.appConfig = {
        ...defaultConfig,
        ...translatedSEO,
      };
    });
  }

  generateMetaTags(seoConfig: SeoConfig): void {
    const config: SeoConfig = {
      ...this.appConfig,
      ...seoConfig,
      title: seoConfig.title ? `${seoConfig.title} - ${this.appConfig.title}` : this.appConfig.title,
      keywords: seoConfig.keywords
        ? [...(seoConfig.article?.tag || []), ...(seoConfig.keywords || []), ...(this.appConfig.keywords || [])]
        : this.appConfig.keywords,
      image: seoConfig.image ? getAbsoluteImageUrl(seoConfig.image) : this.appConfig.image,
      twitter_image: seoConfig.twitter_image && getTwitterImageUrl(seoConfig.twitter_image),
      og_image: seoConfig.og_image && getOGImageUrl(seoConfig.og_image),
    };
    this.config.next(config);

    this.updateTitle(config.title || '');
    this.updateGeneralMetaTags(config);
    this.updateOpenGraph(config);
    this.updateTwitterCard(config);
  }

  private updateTitle(title: string): void {
    this.title.setTitle(title);
  }

  private updateOrRemoveTag(name: string, content?: string, type: 'name' | 'property' = 'name'): void {
    if (!!content) {
      this.meta.updateTag({ ...(type === 'name' ? { name } : { property: name }), content });
    } else {
      this.meta.removeTag(name);
    }
  }

  private updateGeneralMetaTags({ title, description, robots, keywords }: SeoConfig): void {
    this.updateOrRemoveTag('title', title);
    this.updateOrRemoveTag('description', description);
    this.updateOrRemoveTag('robots', robots);
    this.updateOrRemoveTag('keywords', keywords?.join(', '));
  }

  private updateOpenGraph(config: SeoConfig): void {
    const updatePropertyTag = (property: string, content?: string) =>
      this.updateOrRemoveTag(property, content, 'property');

    updatePropertyTag('og:type', 'website');
    updatePropertyTag('og:title', config.title);
    updatePropertyTag('og:description', config.description);
    updatePropertyTag('og:url', `${environment.url}${config.route === '/' ? config.route : config.route + '/'}`);
    updatePropertyTag('og:image', config.og_image || config.image);
    updatePropertyTag('og:image:alt', config.description);
    updatePropertyTag('og:site_name', this.appConfig.title);
    updatePropertyTag('og:locale', config.locale);
    updatePropertyTag('og:locale:alternate', config.locale_alternate);

    this.updateOGArticle(config.article);
    this.updateOGAuthor(config.author);
  }

  get seoChanges$(): Observable<SeoConfig> {
    return this.config.asObservable();
  }

  private updateOGArticle(article?: SeoArticle): void {
    if (article) {
      this.meta.updateTag({
        property: 'og:type',
        content: 'article',
      });

      this.meta.updateTag({
        property: `og:article:published_time`,
        content: article.published_time,
      });
      this.meta.updateTag({
        property: `og:article:modified_time`,
        content: article.modified_time,
      });
      this.meta.updateTag({
        property: `og:article:tag`,
        content: article.tag.join(', '),
      });
      this.meta.updateTag({
        property: `og:article:author`,
        content: article.author.join(', '),
      });
    } else {
      this.meta.removeTag('property="og:article:published_time"');
      this.meta.removeTag('property="og:article:modified_time"');
      this.meta.removeTag('property="og:article:tag"');
      this.meta.removeTag('property="og:article:author"');
    }
  }

  private updateOGAuthor(author?: SeoProfile): void {
    if (author) {
      this.meta.updateTag({
        property: 'og:type',
        content: 'profile',
      });

      this.meta.updateTag({
        property: `og:profile:first_name`,
        content: author.first_name,
      });
      this.meta.updateTag({
        property: `og:profile:last_name`,
        content: author.last_name,
      });
      this.meta.updateTag({
        property: `og:profile:username`,
        content: author.username,
      });
      this.meta.updateTag({
        property: `og:profile:gender`,
        content: author.gender,
      });
    } else {
      this.meta.removeTag('property="og:profile:first_name"');
      this.meta.removeTag('property="og:profile:last_name"');
      this.meta.removeTag('property="og:profile:username"');
      this.meta.removeTag('property="og:profile:gender"');
    }
  }

  private updateTwitterCard(config: SeoConfig): void {
    this.updateOrRemoveTag('twitter:card', 'summary_large_image');
    this.updateOrRemoveTag('twitter:site', '@SaulMoroDev');
    this.updateOrRemoveTag('twitter:creator', '@SaulMoroDev');
    this.updateOrRemoveTag('twitter:title', config.title);
    this.updateOrRemoveTag('twitter:description', config.description);
    this.updateOrRemoveTag('twitter:image', config.twitter_image || config.image);
    this.updateOrRemoveTag('twitter:image:alt', config.description);
  }
}
