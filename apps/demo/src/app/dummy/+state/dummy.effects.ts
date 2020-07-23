import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromDummy from './dummy.reducer';
import * as DummyActions from './dummy.actions';

@Injectable()
export class DummyEffects {
  loadDummy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DummyActions.loadDummy),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DummyActions.loadDummySuccess({ dummy: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DummyActions.loadDummyFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
