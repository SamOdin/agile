import { createAction, props } from '@ngrx/store';

export enum FileActionTypes {
    LOAD_TEXT = '[FILE PAGE] Load Text',
    LOAD_TEXT_SUCCESS = '[FILE PAGE] Load Text Success',
    LOAD_TEXT_ERROR = '[FILE PAGE] Load Text Error',

    MARK_TEXT = '[FILE PAGE] Mark Text As Selected',
    SET_TEXT_STYLE = '[FILE PAGE] Set Text Style',

    SEARCH_SYNONYMS = '[DATAMUSE API] Search Synonyms',
    SEARCH_SYNONYMS_SUCCESS = '[DATAMUSE API] Search Synonyms Success',
    SEARCH_SYNONYMS_ERROR = '[DATAMUSE API] Search Synonyms Error',

    SET_SYNONYMS_WORD = '[HOVER POP UP] Set Synonyms Word',
}

export const LoadText = createAction(FileActionTypes.LOAD_TEXT);
export const LoadTextSuccess = createAction(FileActionTypes.LOAD_TEXT_SUCCESS, props<{payload: any}>());
export const LoadTextError = createAction(FileActionTypes.LOAD_TEXT_ERROR);

export const MarkText = createAction(FileActionTypes.MARK_TEXT, props<{payload: number}>());
export const SetText = createAction(FileActionTypes.SET_TEXT_STYLE, props<{payload: string}>());

export const SearchSynonyms = createAction(FileActionTypes.SEARCH_SYNONYMS, props<{payload: {id: number, text: string}}>());
export const SearchSynonymsSuccess = createAction(FileActionTypes.SEARCH_SYNONYMS_SUCCESS, props<{payload: any}>());
export const SearchSynonymsError = createAction(FileActionTypes.SEARCH_SYNONYMS_ERROR, props<{payload: any}>());

export const SetSynonymsWord = createAction(FileActionTypes.SET_SYNONYMS_WORD, props<{payload: any}>());
