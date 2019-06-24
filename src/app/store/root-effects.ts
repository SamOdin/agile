import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { FileActionTypes, LoadTextSuccess, LoadTextError, SearchSynonymsSuccess, SearchSynonymsError } from './root-actions';
import { TextService, DatamuseService } from '../services';
import { FILE_STATUS } from '../enums';

export interface Text {
    id: number;
    text: string;
    options: {
        isSelected: boolean;
        isBold: boolean;
        isItalic: boolean;
        isUnderlined: boolean;
    };
    synonyms: {
        status: FILE_STATUS,
        data: any
    };
}

@Injectable()
export class TextEffects {

    loadText$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FileActionTypes.LOAD_TEXT),
            switchMap(() =>
                this.textService.getMockText().then(
                    (res) => LoadTextSuccess({payload: res.split(' ')
                            .map((i) => ({
                                id: Math.floor(Math.random() * 1000000),
                                text: i,
                                options: {isSelected: false, isBold: false, isItalic: false, isUnderlined: false},
                                synonyms: {
                                    status: FILE_STATUS.PENDING,
                                    data: []
                                }
                            }))
                    }),
                    () => LoadTextError()
                )
            )
        )
    );

    loadSynonyms$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FileActionTypes.SEARCH_SYNONYMS),
            switchMap(({payload: {text, id}}) =>
                this.datamuseService.setChat(text).then(
                    (res) => SearchSynonymsSuccess({payload: {id, data: res}}),
                    (err) => SearchSynonymsError(err)
                )
            )
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly textService: TextService,
        private readonly datamuseService: DatamuseService
    ) {}
}
