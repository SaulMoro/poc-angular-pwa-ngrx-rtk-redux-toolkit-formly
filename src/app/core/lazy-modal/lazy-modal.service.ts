import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { DIALOG_DATA } from './data-token';

@Injectable({ providedIn: 'root' })
export class LazyModalService<T> {
  private componentRef: ComponentRef<T> | undefined;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {}

  open(component: Type<T>, data?: any): void {
    if (this.componentRef) {
      return;
    }

    const dialogFactory = this.componentFactoryResolver.resolveComponentFactory<T>(component);
    this.componentRef = this._createDialog(dialogFactory, data);
    this.appRef.attachView(this.componentRef.hostView);

    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  close(): void {
    if (!this.componentRef) {
      return;
    }

    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();

    this.componentRef = undefined;
  }

  private _createDialog(dialogFactory: ComponentFactory<T>, data: any): ComponentRef<T> {
    return dialogFactory.create(
      Injector.create({
        providers: [
          {
            provide: DIALOG_DATA,
            useValue: data,
          },
        ],
        parent: this.injector,
      }),
    );
  }
}
