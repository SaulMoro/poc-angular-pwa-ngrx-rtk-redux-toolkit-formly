# **PoC Angular + PWA + NgRx + Router State + NgRx-Entity + Formly**

[Demo of project](https://SaulMoro.github.io/poc-angular-pwa-ngrx-entity-formly-routerstate)

## Table of Contents

- [Quick Start](#quick-start)
- [Description](#description)
  - [NgRx/RxJS Operators](#ngrx/rxjs-operators)
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
- **Container / Presentational Components**(Smart / Dumb Components)
- **Formly** for generating dynamic forms
- [**Multilingual site**](https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites) with my own Transloco Localize Router plugin
- **Performance** with the use of trackBy, OnPush, Intersection Observer ...

**State Management**

- **NgRx** as State Management
- **NgRx Entity** for the treatment of entities with NgRx
- **NgRx Router State** to manage the state of the App from the Router in NgRx
- **Forms connected to NgRx** to avoid the use of actions, handle the forms from NgRx and filters by automatic queryParams
- [**NgRx / RxJS Operators**](#ngrx/rxjs-operators) to handle the information of the Router and the Forms from NgRx
- [**Good Actions Hygiene**](https://www.youtube.com/watch?v=JmnsEvoy-gY) to think on actions as events ([Source] Event), not as commands
- [**ngrx-store-localstorage**](https://github.com/btroncone/ngrx-store-localstorage) to save or retrieve parts of the state from the localStorage. We rehydrate NgRx content (Cache)

**Other**

- **Prefetch Directive** to preload information when a component is hovered over or displayed on the screen
- **Auto Lazy Load Images Directive** to automatically add lazy load to images if browser supports it
- **Skeleton content loader**
- **Auto deploy** with Github Actions
- **CodeQL** analysis
- **Husky and lint-staged** to pass lint and prettier to changed code on commit
- **Commitlint** to use [Convetional Commits](https://www.conventionalcommits.org/)

### **NgRx/RxJS Operators**

pipes and utilities, combined NgRx and RxJS to get their full potential

#### **ofRoute**

Trigger the effect when navigating to the indicated routes

Input: string | string[] | RegExp

Output: RouterStateUrl

```javascript
xxxeffect$ = createEffect(() =>
    this.actions$.pipe(
      ofRoute('/characters'),
      // We can take advantage of the state of the route here (params, queryParams, ...)
      // ...
    )
  );
```

#### **ofRouteEnter**

Trigger the effect when navigating to the indicated routes from a different page

Input: string | string[] | RegExp

Output: RouterStateUrl

```javascript
xxxeffect$ = createEffect(() =>
    this.actions$.pipe(
      ofRouteEnter('/characters'),
      // We can take advantage of the state of the route here (params, queryParams, ...)
      map(() => CharactersActions.enterCharactersPage()) // Example
    )
  );
```

#### **ofRouteFilter**

Trigger the effect when a queryParam is added or modified to the current route. Ignore the "page" param, it is used for pagination.

Input: string | string [] | RegExp

Output: QueryParams (ignore "page" param)

```javascript
xxxeffect$ = createEffect(() =>
    this.actions$.pipe(
      ofRouteFilter('/characters'),
      // We can take advantage to use the queryParams for map or filter
      map((filter) => CharactersActions.filterCharacters({ filter })) // Example
    )
  );
```

#### **ofRoutePageChange**

Trigger the effect when the queryParam "page" is changed in the same route.

Input: string | string[] | RegExp

Output: number (page number)

```javascript
xxxeffect$ = createEffect(() =>
    this.actions$.pipe(
      ofRoutePageChange('/characters'),
      map((page) => CharactersActions.pageChange({ page })) // Example
    )
  );
```

#### **ofSubmitForm**

Trigger the effect when a **Submit** of any of the indicated forms is made

Input: string | string[] | RegExp

Output: { formId: string; model: any; initialModel: any; filter: boolean }

```javascript
xxxeffect$ = createEffect(() =>
    this.actions$.pipe(
      ofSubmitForm(FormIds.CHARACTERS_DETAILS_FORM_ID),
      // We can take advantage of the form data here for map, filter, ...
      // ...
    )
  );
```

#### **ofUpdateForm**

Trigger the effect when a **Update** of any of the indicated forms is made

Input: string | string[] | RegExp

Output: { formId: string; model: any; filter: boolean }

```javascript
xxxeffect$ = createEffect(() =>
    this.actions$.pipe(
      ofUpdateForm([FormIds.CHARACTERS_DETAILS_FORM_ID, FormIds.XXXX_FORM_ID]),
      // We can take advantage of the form data here for map, filter, ...
      // ...
    )
  );
```

#### **ofFilterForm**

Trigger the effect when a **Update** of any of the indicated forms is made and this is **filter** type

Input: string | string[] | RegExp

Output: model of form

```javascript
// Example
filterCharacters$ = createEffect(() => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      // ofRouteFilter('/characters'), // (Same function)
      ofFilterForm(FormIds.FORM_CHARACTERS_FILTER_ID),
      debounceTime(debounce, scheduler),
      switchMap(() =>
        // Reset Filter Page (Example)
        this.router.navigate([], {
          queryParams: { page: null },
          queryParamsHandling: 'merge',
        })
      ),
      map(() => CharactersActions.filterCharacters()) // Example
    )
  );
```

#### **ofInitForm**

Trigger the effect when a **Init** of any of the indicated forms is made

Input: string | string[] | RegExp

Output: { formId: string; initialModel: any; filter: boolean }

```javascript
xxxeffect$ = createEffect(() =>
    this.actions$.pipe(
      ofInitForm(FormIds.CHARACTERS_DETAILS_FORM_ID),
      // We can take advantage of the form data here for map, filter, ...
      // ...
    )
  );
```

#### **fromStore**

Utility that helps us to obtain, through the use of selectors, part of the state in an effect

There is the getFromStore alternative, which does the same but starting an observable, instead of reusing the existing stream.

```javascript
// Example
loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.enterCharactersPage, CharactersActions.pageChange, CharactersActions.filterCharacters),
      fromStore(CharactersSelectors.getCurrentFilter, CharactersSelectors.getCurrentPage)(this.store),
      switchMap(([action, currentFilter, page]) =>
        this.charactersService.getCharacters(currentFilter, page).pipe(
          // ...
        )
      )
    )
  );
```

#### **untilDestroyed**

Utility that helps us to unsubscribe an observable when a component is destroyed. You need to implement the ngOnDestroy.

```javascript
// Example
this.formControl.valueChanges
  .pipe(untilDestroyed(this))
  .subscribe(() => this.checkInputs());
```

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
