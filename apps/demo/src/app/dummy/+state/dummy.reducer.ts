import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DummyActions from './dummy.actions';
import { DummyEntity } from './dummy.models';

export const DUMMY_FEATURE_KEY = 'dummy';

export interface State extends EntityState<DummyEntity> {
  selectedId?: string | number; // which Dummy record has been selected
  loaded: boolean; // has the Dummy list been loaded
  error?: string | null; // last known error (if any)
}

export interface DummyPartialState {
  readonly [DUMMY_FEATURE_KEY]: State;
}

export const dummyAdapter: EntityAdapter<DummyEntity> = createEntityAdapter<
  DummyEntity
>();

export const initialState: State = dummyAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const dummyReducer = createReducer(
  initialState,
  on(DummyActions.loadDummy, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DummyActions.loadDummySuccess, (state, { dummy }) =>
    dummyAdapter.addAll(dummy, { ...state, loaded: true })
  ),
  on(DummyActions.loadDummyFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(DummyActions.loadDummyFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(DummyActions.updateItem, (state, { item }) =>
    dummyAdapter.upsertOne(item, state)
  ),
  on(DummyActions.addItem, (state, { item }) =>
    dummyAdapter.addOne(item, state)
  ),
  on(DummyActions.setSelected, (state, { selectedId }) => ({
    ...state,
    selectedId,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return dummyReducer(state, action);
}
