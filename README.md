# **PoC Angular + PWA + NgRx + RTK (Redux Toolkit) + Router State + TailwindCSS + Formly**

[Demo of project](https://poc-angular-rick-morty.web.app)

## Table of Contents

- [Quick Start](#quick-start)
- [Description](#description)
- [Code scaffolding](#code-scaffolding)
- [Contact](#contact)

## **Quick Start**

1. Run `npm i`
2. Run `npm run start`

## **Description**

PoC of an Angular project with:

**Angular Core**

- **Core and Shared modules**
- **Lazy Loading Features**
- **Container / Presentational Components** (Smart / Dumb Components)
- **TailwindCSS**
- **Formly** for generating dynamic forms
- [**Multilingual site**](https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites) with my own Transloco Localize Router plugin and adds automatically [**hreflang links**](https://developers.google.com/search/docs/advanced/crawling/localized-versions)
- **Google Analytics** with page views and events
- **Multilingual SEO** (Important: It would have to be transformed to SSR/SSG application for optimal SEO)
- **Performance** with the use of trackBy, OnPush, Intersection Observer ...

**State Management**

- **NgRx** as State Management
- **NgRx + RTK (Redux Toolkit)**
- **RTK Entity** for the treatment of entities with NgRx
- **NgRx Router State** to manage the state of the App from the Router in NgRx
- **Forms connected to NgRx** to avoid the use of actions, handle the forms from NgRx and filters by automatic queryParams
- [**Good Actions Hygiene**](https://www.youtube.com/watch?v=JmnsEvoy-gY) to think on actions as events ([Source] Event), not as commands
- [**ngrx-store-localstorage**](https://github.com/btroncone/ngrx-store-localstorage) to save or retrieve parts of the state from the localStorage. We rehydrate NgRx content (Cache)

**Other**

- **Dark Mode** with Media Query 'prefers-color-scheme: dark' support
- **Prefetch Directive** to preload information when a component is hovered over or displayed on the screen
- **Auto Lazy Load Images Directive** to automatically add lazy load to images if browser supports it
- **Skeleton content loader** with TailwindCSS and @ngneat/content-loader
- **Auto deploy on Merge and preview on PR** with Github Actions
- **CodeQL** analysis
- **Husky and lint-staged** to pass lint and prettier to changed code on commit
- **Commitlint** to use [Convetional Commits](https://www.conventionalcommits.org/)

## **Code scaffolding**

```bash
# Create Lazy Feature
> ng g module features/(nombre-feature) --module [app | parent-module-name] --route (route-name)

# Create Data-Access of a Feature (Not Shared)
> ng g module features/(nombre-feature)/data-access-(state-name) --module features/(nombre-feature-padre)
> ng g feature features/(nombre-feature)/data-access-(state-name)/+state/(StateName) -m features/(nombre-feature)/data-access-(state-name) --creators --api
> ng g service features/(nombre-feature)/data-access-(state-name)/services/(service-name)
> ng g interface features/(nombre-feature)/data-access-(state-name)/models/(model-name) model

# Create Shared Data-Access
> ng g module shared/data-access-(state-name) --module shared
> ng g feature shared/data-access-(state-name)/+state/(StateName) -m shared/data-access-(state-name) --creators --api
> ng g service shared/data-access-(state-name)/services/(service-name)
> ng g interface shared/data-access-(state-name)/models/(model-name) model

# Misc
> ng g component features/(nombre-feature)/containers/(container-name)
> ng g component features/(nombre-feature)/components/(component-name)
> ng g service features/(nombre-feature)/services/(service-name)
> ng g interface features/(nombre-feature)/models/(model-name) model
```

## Contact

**Saúl Moro Gómez**
[smoro@atsistemas.com](mailto:smoro@atsistemas.com)
