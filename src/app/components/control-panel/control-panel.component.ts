import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetText } from '../../store/root-actions';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlPanelComponent {

  constructor(
      private readonly store: Store<any>
  ) {}

  setStyle (param: string): void {
    this.store.dispatch(SetText({payload: param}));
  }
}
