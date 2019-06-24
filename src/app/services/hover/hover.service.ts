import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';

@Injectable()
export class HoverService {
  public componentRef: any | undefined | null;

  constructor(
      private readonly componentFactoryResolver: ComponentFactoryResolver,
      private readonly appRef: ApplicationRef,
      private readonly injector: Injector
  ) {}

  toggleComponentToBody(component: any, params: any) {
    if (this.componentRef) {
      this.remove();
      this.create(component, params);
    } else {
      this.create(component, params);
    }
  }

  create (component: any, params: any): void {
    this.componentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);
    this.componentRef.instance.x = params.x;
    this.componentRef.instance.y = params.y;
    this.componentRef.instance.data = params.data;

    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  remove (): void {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
