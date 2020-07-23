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
