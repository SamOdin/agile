import { Component, Input, ChangeDetectionStrategy, HostBinding, OnInit } from '@angular/core';
import { FILE_STATUS } from '../../enums';
import { SearchSynonyms, SetSynonymsWord } from '../../store/root-actions';
import { select, Store, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { find } from 'lodash';
import { HoverService } from '../../services';

@Component({
  selector: 'app-hover',
  templateUrl: './hover.component.html',
  styleUrls: ['./hover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HoverComponent implements OnInit {
  @Input() x: number | undefined;
  @Input() y: number | undefined;
  @Input() data: any | undefined;

  statuses = FILE_STATUS;
  state$: Observable<any>;

  constructor (
      private readonly store: Store<any>,
      private readonly hoverService: HoverService,
  ) {}

  @HostBinding('style.left.px') get textX() {
    return this.x;
  }

  @HostBinding('style.top.px') get textY() {
    return this.y + 15;
  }

  ngOnInit(): void {
    const {synonyms: {status}, text, id} = this.data;
    if (status !== FILE_STATUS.LOADED) {
      this.store.dispatch(SearchSynonyms({payload: {id, text}}));
    }

    const selectState = (state) => state.app;
    const getData = createSelector(selectState, state => {
      return find(state.text, (item) => item.id === id);
    });
    this.state$ = this.store.pipe(select(getData));
  }

  trackByRow (i, row): number {
    return row.id;
  }

  selectWord (item: any): void {
    const {word} = item;
    this.store.dispatch(SetSynonymsWord({payload: {id: this.data.id, text: word}}));
    this.hoverService.remove();
  }
}
