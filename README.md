# **PoC Angular + PWA + Ngrx + Formly + Router State + NgRx-Entity**

[Website](https://saul-.github.io/poc-angular-pwa-ngrx-entity-formly-routerstate)

## Table of Contents

- [Quick Start](#quick-start)
- [Description](#description)
  - [NgRx/RxJS Utils](#ngrx/rxjs-utils)
- [Code scaffolding](#code-scaffolding)
- [Contact](#contact)

## **Quick Start**

1. Run `npm i`
2. Run `npm run start`

## **Description**

PoC para atSistemas de un proyecto Angular con:

**Angular Core**

- **Modulos Core y Shared**
- **Lazy Loading Features**
- **Container/Presentational Components** (Smart/Dumb Components)
- **Formly** para generación de formularios dinámicos
- **Rendimiento** con el uso de trackBy, OnPush, Intersection Observer...

**State Management**

- **NgRx** como State Management
- **NgRx Entity** para el tratamiento de entidades dentro de NgRx
- **NgRx Router State** para manejar el estado de la App a partir del Router en NgRx
- **Forms conectados a NgRx** para evitar el uso de acciones, manejar los formularios desde NgRx y filtros por queryParams automáticos
- [**NgRx/RxJS Utils**](#ngrx/rxjs-utils) para manejar la información de el Router y los Formularios desde NgRx
- [**Good Actions Hygiene**](https://www.youtube.com/watch?v=JmnsEvoy-gY) para pensar las acciones como eventos ([Source] Event), no como comandos
- [**ngrx-store-localstorage**](https://github.com/btroncone/ngrx-store-localstorage) para guardar o recuperar partes del estado desde el localStorage. Rehidratamos contenido de NgRx (Cache)

**Other**

- **Prefetch Directive** para precargar información cuando un componente se le pase el ratón por encima o se muestre por pantalla
- **Auto Lazy Load Images Directive** para añadir automáticamente el lazy load a las imágenes si el navegador lo soporta
- **HttpClient Loading Wrapper** para automatizar la muestra de spinner en ciertas llamadas backend
- **Husky y lint-staged** para pasar lint y prettier a código cambiado al hacer commit
- **Commitlint** para usar [Convetional Commits](https://www.conventionalcommits.org/)

### **NgRx/RxJS Utils**

pipes y utilidades combinado NgRx y RxJS para sacar todo su potencial

#### **ofRoute**

Salta el efecto cuando se navega a las rutas indicadas

Input: string | string[] | RegExp

Output: RouterStateUrl

```javascript
xxxeffect$ = createEffect(() =>
    this.actions$.pipe(
      ofRoute('/characters'),
      // Podemos aprovechar el estado de la ruta aquí (params, queryParams, ...)
      // ...
    )
  );
```

#### **ofRouteEnter**

Salta el efecto cuando se navega a las rutas indicadas desde otra página distinta

Input: string | string[] | RegExp

Output: RouterStateUrl

```javascript
xxxeffect$ = createEffect(() =>
    this.actions$.pipe(
      ofRouteEnter('/characters'),
      // Podemos aprovechar el estado de la ruta aquí (params, queryParams, ...)
      map(() => CharactersActions.enterCharactersPage())
    )
  );
```

#### **ofRouteFilter**

Salta el efecto cuando se añade o modifica un queryParam a la ruta actual. Ignora el parámetro "page", se usa para paginación.

Input: string | string[] | RegExp

Output: QueryParams (quitando parámetro page)

```javascript
xxxeffect$ = createEffect(() =>
    this.actions$.pipe(
      ofRouteFilter('/characters'),
      // Podemos aprovechar para usar los queryParams para map o filter
      map((filter) => CharactersActions.filterCharacters({ filter }))
    )
  );
```

#### **ofRoutePageChange**

Salta el efecto cuando se cambia el queryParam "page" en la misma ruta.

Input: string | string[] | RegExp

Output: number (número de página)

```javascript
xxxeffect$ = createEffect(() =>
    this.actions$.pipe(
      ofRoutePageChange('/characters'),
      map((page) => CharactersActions.pageChange({ page }))
    )
  );
```

#### **ofSubmitForm**

Salta el efecto cuando se **envía** alguno de los formularios indicados

Input: string | string[] | RegExp

Output: { formId: string; model: any; initialModel: any; filter: boolean }

```javascript
xxxeffect$ = createEffect(() =>
    this.actions$.pipe(
      ofSubmitForm(FormIds.CHARACTERS_DETAILS_FORM_ID),
      // Podemos aprovechar los datos del formulario aquí para map, filter, ...
      // ...
    )
  );
```

#### **ofUpdateForm**

Salta el efecto cuando se **actualiza** alguno de los formularios indicados

Input: string | string[] | RegExp

Output: { formId: string; model: any; filter: boolean }

```javascript
xxxeffect$ = createEffect(() =>
    this.actions$.pipe(
      ofUpdateForm([FormIds.CHARACTERS_DETAILS_FORM_ID, FormIds.XXXX_FORM_ID]),
      // Podemos aprovechar los datos del formulario aquí para map, filter, ...
      // ...
    )
  );
```

#### **ofFilterForm**

Salta el efecto cuando se **actualiza** alguno de los formularios indicados y este es de **tipo filter**

Input: string | string[] | RegExp

Output: model del formulario

```javascript
filterCharacters$ = createEffect(() => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
    this.actions$.pipe(
      // ofRouteFilter('/characters'), // (Same function)
      ofFilterForm(FormIds.FORM_CHARACTERS_FILTER_ID),
      debounceTime(debounce, scheduler),
      switchMap(() =>
        // Reset Filter Page
        this.router.navigate([], {
          queryParams: { page: null },
          queryParamsHandling: 'merge',
        })
      ),
      map(() => CharactersActions.filterCharacters())
    )
  );
```

#### **ofInitForm**

Salta el efecto cuando se **inicia** alguno de los formularios indicados

Input: string | string[] | RegExp

Output: { formId: string; initialModel: any; filter: boolean }

```javascript
xxxeffect$ = createEffect(() =>
    this.actions$.pipe(
      ofInitForm(FormIds.CHARACTERS_DETAILS_FORM_ID),
      // Podemos aprovechar los datos del formulario aquí para map, filter, ...
      // ...
    )
  );
```

#### **fromStore**

Utilidad que nos sirve para obtener, mediante el uso de selectores, parte del estado en un efecto

Existe la variante getFromStore, que hace lo mismo pero iniciando un observable, en lugar de reutilizar el existente.

```javascript
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

Utilidad que nos sirve para desubscribir un observable al destruirse un componente. Es necesario implementar el ngOnDestroy.

```javascript
this.formControl.valueChanges
  .pipe(untilDestroyed(this))
  .subscribe(() => this.checkInputs());
```

## **Code scaffolding**

```bash
# Crear Feature Lazy
> ng g module features/(nombre-feature) --module app --route (nombre-ruta)

# Añadir Data-Access a Feature
> ng g module features/(nombre-feature)/data-access-(state-name) --module features/(nombre-feature-padre)
> ng g feature features/(nombre-feature)/data-access-(state-name)/+state/(StateName) -m features/(nombre-feature)/data-access-(state-name) --creators --api
> ng g service features/(nombre-feature)/data-access-(state-name)/services/(service-name)
> ng g interface features/(nombre-feature)/data-access-(state-name)/models/(model-name) model

# Añadir Data-Access a Shared
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
