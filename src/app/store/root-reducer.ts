import { Action, createReducer, on } from '@ngrx/store';
import * as FileActions from './root-actions';
import { FILE_STATUS } from '../enums';

export interface State {
    text: any | undefined;
}

export const initialState: State = {
    text: []
};

const fileReducer = createReducer(
    initialState,
    on(FileActions.LoadTextSuccess, (state, props) => {
        const {payload} = props;
        return {...state, text: [...payload]};
    }),
    on(FileActions.MarkText, (state, props) => {
        const {payload} = props;
        return {...state, text: state.text.map((i) => i.id === payload ?
                {...i, options: {...i.options, isSelected: !i.options.isSelected}} : {...i})};
    }),
    on(FileActions.SetText, (state, props) => {
        const {payload} = props;
        return {...state, text: state.text.map((i) => i.options.isSelected ?
                {...i, options: {...i.options, [payload]: !i.options[payload]}} : {...i})};
    }),
    on(FileActions.SearchSynonyms, (state, props) => {
        const {payload: {id}} = props;
        return {...state, text: state.text.map((i) => i.id === id ?
                {...i, synonyms: {...i.synonyms, status: FILE_STATUS.LOADING}} : {...i})};
    }),
    on(FileActions.SearchSynonymsSuccess, (state, props) => {
        const {payload: {id, data}} = props;
        return {...state, text: state.text.map((i) => i.id === id ?
                {...i, synonyms: {...i.synonyms, status: FILE_STATUS.LOADED, data: [...data]}} : {...i})};
    }),
    on(FileActions.SetSynonymsWord, (state, props) => {
        const {payload: {id, text}} = props;
        return {...state, text: state.text.map((i) => i.id === id ?
                {...i, text, synonyms: {...i.synonyms, status: FILE_STATUS.PENDING, data: []}} : {...i})};
    })
);

export function reducer(state: State | undefined, action: Action) {
    return fileReducer(state, action);
}
