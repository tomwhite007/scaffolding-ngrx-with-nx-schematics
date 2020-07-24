import { createAction, props } from '@ngrx/store';
import { DummyEntity } from './dummy.models';

export const loadDummy = createAction('[Dummy] Load Dummy');

export const loadDummySuccess = createAction(
  '[Dummy] Load Dummy Success',
  props<{ dummy: DummyEntity[] }>()
);

export const loadDummyFailure = createAction(
  '[Dummy] Load Dummy Failure',
  props<{ error: any }>()
);

export const updateItem = createAction(
  '[AppComponent] Update Item',
  props<{ item: DummyEntity }>()
);

export const addItem = createAction(
  '[AppComponent] Add Item',
  props<{ item: DummyEntity }>()
);

export const setSelected = createAction(
  '[AppComponent] Set Selected Id',
  props<{ selectedId: string }>()
);
