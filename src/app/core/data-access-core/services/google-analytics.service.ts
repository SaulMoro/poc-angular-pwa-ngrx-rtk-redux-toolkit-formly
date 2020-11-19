import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

declare let gtag;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor() {
    this._init();
  }

  sendEvent(eventName: string, eventCategory: string, eventLabel: string = null, eventValue: number = null): void {
    if (!environment.gaTrackingId) {
      // console.warn('not triggering analytics event without gtag');
      console.log('sendEvent', { eventName, eventCategory, eventLabel, eventValue });
      return;
    }
    console.log('sendEvent', { eventName, eventCategory, eventLabel, eventValue });
    gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: eventValue,
    });
  }

  sendPageView(url: string, title?: string): void {
    if (!environment.gaTrackingId) {
      // console.warn('not triggering analytics event without gtag');
      console.log('sendPageView', { page_title: title, page_path: url });
      return;
    }
    console.log('sendPageView', { page_title: title, page_path: url });
    gtag('event', 'page_view', {
      page_title: title,
      page_path: url,
    });
  }

  private _init(): void {
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
