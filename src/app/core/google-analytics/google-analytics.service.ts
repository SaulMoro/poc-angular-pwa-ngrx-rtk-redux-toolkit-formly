import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { GAEvent, GAEventCategory, GAPageView } from './types';

declare let gtag;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor() {
    this.init();
  }

  sendEvent({ name, category, label = null, value = null }: GAEvent): void {
    if (!environment.gaTrackingId) {
      console.warn('not triggering analytics event without gtag');
      console.log('sendEvent', { name, category, label, value });
      return;
    }
    gtag('event', name, {
      event_category: category,
      event_label: label,
      value,
    });
  }

  sendPageView({ url, title }: GAPageView): void {
    if (!environment.gaTrackingId) {
      console.warn('not triggering analytics event without gtag');
      console.log('sendPageView', { url, title });
      return;
    }
    gtag('event', 'page_view', {
      page_title: title,
      page_path: url,
    });
  }

  sendExternalLinkEvent(ref: string): void {
    this.sendEvent({ name: 'External Link click', category: GAEventCategory.ENGAGEMENT, label: ref });
  }

  private init(): void {
    if (environment.gaTrackingId) {
      // register google tag manager
      const gTagManagerScript = document.createElement('script');
      gTagManagerScript.async = true;
      gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gaTrackingId}`;
      document.head.appendChild(gTagManagerScript);

      // register google analytics
      const gaScript = document.createElement('script');
      gaScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        /** Disable automatic page view hit to fix duplicate page view count **/
        gtag('config', '${environment.gaTrackingId}', { send_page_view: false });
      `;
      document.head.appendChild(gaScript);
    }
  }
}
