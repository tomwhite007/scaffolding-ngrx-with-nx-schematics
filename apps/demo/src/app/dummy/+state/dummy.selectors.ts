import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DUMMY_FEATURE_KEY,
  State,
  DummyPartialState,
  dummyAdapter,
} from './dummy.reducer';

// Lookup the 'Dummy' feature state managed by NgRx
export const getDummyState = createFeatureSelector<DummyPartialState, State>(
  DUMMY_FEATURE_KEY
);

const { selectAll, selectEntities } = dummyAdapter.getSelectors();

export const getDummyLoaded = createSelector(
  getDummyState,
  (state: State) => state.loaded
);

export const getDummyError = createSelector(
  getDummyState,
  (state: State) => state.error
);

export const getAllDummy = createSelector(getDummyState, (state: State) =>
  selectAll(state)
);

export const getDummyEntities = createSelector(getDummyState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getDummyState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getDummyEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
