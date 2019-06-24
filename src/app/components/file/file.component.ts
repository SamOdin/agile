import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TextService } from '../../services';
import { LoadText, MarkText } from '../../store/root-actions';
import { Observable } from 'rxjs';
import { createFeatureSelector, select, Store } from '@ngrx/store';
import { Text } from '../../store/root-effects';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements OnInit {
  text$: Observable<any>;

  constructor(
      private readonly textService: TextService,
      private readonly store: Store<any>
  ) {}

  ngOnInit() {
    this.text$ = this.store.pipe(
        select(createFeatureSelector<any>('app'))
    );
    this.store.dispatch(LoadText());
  }

  trackByRow (i, row): number {
    return row.id;
  }

  selectText (item: Text): void {
    const {id} = item;
    this.store.dispatch(MarkText({payload: id}));
  }
}
