import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromDummy from './dummy.reducer';
import * as DummySelectors from './dummy.selectors';
import * as DummyActions from './dummy.actions';

@Injectable()
export class DummyFacade {
  loaded$ = this.store.pipe(select(DummySelectors.getDummyLoaded));
  allDummy$ = this.store.pipe(select(DummySelectors.getAllDummy));
  selectedDummy$ = this.store.pipe(select(DummySelectors.getSelected));
  dummyEntities$ = this.store.pipe(select(DummySelectors.getDummyEntities));

  dummyActions = DummyActions;

  constructor(private store: Store<fromDummy.DummyPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
