import { DummyEntity } from './dummy.models';
import { State, dummyAdapter, initialState } from './dummy.reducer';
import * as DummySelectors from './dummy.selectors';

describe('Dummy Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDummyId = (it) => it['id'];
  const createDummyEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DummyEntity);

  let state;

  beforeEach(() => {
    state = {
      dummy: dummyAdapter.addAll(
        [
          createDummyEntity('PRODUCT-AAA'),
          createDummyEntity('PRODUCT-BBB'),
          createDummyEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Dummy Selectors', () => {
    it('getAllDummy() should return the list of Dummy', () => {
      const results = DummySelectors.getAllDummy(state);
      const selId = getDummyId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = DummySelectors.getSelected(state);
      const selId = getDummyId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getDummyLoaded() should return the current 'loaded' status", () => {
      const result = DummySelectors.getDummyLoaded(state);

      expect(result).toBe(true);
    });

    it("getDummyError() should return the current 'error' state", () => {
      const result = DummySelectors.getDummyError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
