import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { HoverService } from '../../services';
import { HoverComponent } from '../../components';

@Directive({
  selector: '[appHoverText]'
})
export class HoverTextDirective {
  @Input('appHoverText') appHoverText: any;

  constructor(
      private readonly el: ElementRef,
      private readonly hoverService: HoverService
  ) {}

  @HostListener('click', ['$event'])
  onClickEnter(event: MouseEvent) {
    const {x, y} = event;
    if (this.appHoverText.options.isSelected) {
      this.hoverService.remove();
    } else {
      this.hoverService.toggleComponentToBody(HoverComponent, {x, y, data: this.appHoverText});
    }
  }
}
