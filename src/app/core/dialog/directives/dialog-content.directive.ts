import {
  Directive,
  Input,
  OnInit,
  ComponentFactoryResolver,
  ComponentRef,
  ViewContainerRef,
  Type,
} from '@angular/core';
import { ComponentInsideDialog, FormInsideDialog } from '../models/dialog.model';

function isComponent(arg: ComponentInsideDialog | FormInsideDialog): arg is ComponentInsideDialog {
  return !!arg;
}

@Directive({
  // tslint:disable-next-line
  selector: '[dialogContent]',
  exportAs: 'dialogContent',
})
export class DialogContentDirective implements OnInit {
  @Input() content: Type<ComponentInsideDialog> | Type<FormInsideDialog>;

  get data(): any {
    return isComponent(this.componentRef.instance)
      ? (this.componentRef.instance as ComponentInsideDialog).componentDataOut
      : (this.componentRef.instance as FormInsideDialog).form.value;
  }

  private componentRef: ComponentRef<ComponentInsideDialog | FormInsideDialog>;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {}

  ngOnInit(): void {
    const cf = this.resolver.resolveComponentFactory<ComponentInsideDialog | FormInsideDialog>(this.content);
    this.componentRef = this.container.createComponent(cf);
  }
}
