import { DummyEntity } from './dummy.models';
import * as DummyActions from './dummy.actions';
import { State, initialState, reducer } from './dummy.reducer';

describe('Dummy Reducer', () => {
  const createDummyEntity = (id: string, name = '') =>
    ({
      id,
      title: name || `name-${id}`,
    } as DummyEntity);

  beforeEach(() => {});

  describe('valid Dummy actions', () => {
    it('loadDummySuccess should return set the list of known Dummy', () => {
      const dummy = [
        createDummyEntity('PRODUCT-AAA'),
        createDummyEntity('PRODUCT-zzz'),
      ];
      const action = DummyActions.loadDummySuccess({ dummy });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
