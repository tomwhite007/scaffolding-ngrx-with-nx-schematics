import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { DummyEntity } from './dummy.models';
import { DummyEffects } from './dummy.effects';
import { DummyFacade } from './dummy.facade';

import * as DummySelectors from './dummy.selectors';
import * as DummyActions from './dummy.actions';
import {
  DUMMY_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './dummy.reducer';

interface TestSchema {
  dummy: State;
}

describe('DummyFacade', () => {
  let facade: DummyFacade;
  let store: Store<TestSchema>;
  const createDummyEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DummyEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DUMMY_FEATURE_KEY, reducer),
          EffectsModule.forFeature([DummyEffects]),
        ],
        providers: [DummyFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(DummyFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allDummy$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(DummyActions.loadDummy());

        list = await readFirst(facade.allDummy$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadDummySuccess` to manually update list
     */
    it('allDummy$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allDummy$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          DummyActions.loadDummySuccess({
            dummy: [createDummyEntity('AAA'), createDummyEntity('BBB')],
          })
        );

        list = await readFirst(facade.allDummy$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
