import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { DummyEffects } from './dummy.effects';
import * as DummyActions from './dummy.actions';

describe('DummyEffects', () => {
  let actions: Observable<any>;
  let effects: DummyEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DummyEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(DummyEffects);
  });

  describe('loadDummy$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DummyActions.loadDummy() });

      const expected = hot('-a-|', {
        a: DummyActions.loadDummySuccess({ dummy: [] }),
      });

      expect(effects.loadDummy$).toBeObservable(expected);
    });
  });
});
