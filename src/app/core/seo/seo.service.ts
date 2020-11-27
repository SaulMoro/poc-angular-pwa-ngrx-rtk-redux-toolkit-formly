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
  private config: BehaviorSubject<SeoConfig> = new BehaviorSubject<SeoConfig>({ ...defaultConfig });
  private appConfig: Partial<SeoConfig>;
  seoChanges$: Observable<SeoConfig> = this.config.asObservable();

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
        ? [...(seoConfig.article?.tag || []), ...(seoConfig.keywords || []), ...this.appConfig.keywords]
        : this.appConfig.keywords,
      image: seoConfig.image ? getAbsoluteImageUrl(seoConfig.image) : this.appConfig.image,
      twitter_image: getTwitterImageUrl(seoConfig.twitter_image),
      og_image: getOGImageUrl(seoConfig.og_image),
    };
    this.config.next(config);

    this.updateTitle(config.title);
    this.updateGeneralMetaTags(config);
    this.updateOpenGraph(config);
    this.updateTwitterCard(config);
  }

  private updateTitle(title: string): void {
    this.title.setTitle(title);
  }

  private updateGeneralMetaTags({ title, description, robots, keywords }: SeoConfig): void {
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ name: 'keywords', content: keywords.join(', ') });
  }

  private updateOpenGraph(config: SeoConfig): void {
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({
      property: 'og:description',
      content: config.description,
    });
    this.meta.updateTag({
      property: 'og:url',
      content: `${environment.url}${config.route === '/' ? config.route : config.route + '/'}`,
    });
    this.meta.updateTag({
      property: 'og:image',
      content: config.og_image || config.image,
    });
    this.meta.updateTag({
      property: 'og:image:alt',
      content: config.description,
    });
    this.meta.updateTag({
      property: 'og:site_name',
      content: this.appConfig.title,
    });
    this.meta.updateTag({
      property: 'og:locale',
      content: config.locale,
    });
    this.meta.updateTag({
      property: 'og:locale:alternate',
      content: config.locale_alternate,
    });

    this.updateOGArticle(config.article);
    this.updateOGAuthor(config.author);
  }

  private updateOGArticle(article: SeoArticle): void {
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

  private updateOGAuthor(author: SeoProfile): void {
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
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:site', content: '@herzau_' });
    this.meta.updateTag({ name: 'twitter:creator', content: '@herzau_' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: config.description,
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: config.twitter_image || config.image,
    });
    this.meta.updateTag({
      name: 'twitter:image:alt',
      content: config.description,
    });
  }
}
