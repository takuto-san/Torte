import countReducer, {
  initializeCount,
  increment,
  decrement,
  incrementByAmount,
  CounterState
} from '@/stores/count/counterSlice';

describe('countReducer', () => {
  const initialState: CounterState = { value: 0 };

  it('should return the initial state', () => {
    expect(countReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle initializeCount', () => {
    expect(countReducer(initialState, initializeCount(5))).toEqual({ value: 5 });
  });

  it('should handle increment', () => {
    expect(countReducer({ value: 2 }, increment())).toEqual({ value: 3 });
  });

  it('should handle decrement', () => {
    expect(countReducer({ value: 3 }, decrement())).toEqual({ value: 2 });
  });

  it('should handle incrementByAmount', () => {
    expect(countReducer({ value: 10 }, incrementByAmount(7))).toEqual({ value: 17 });
  });
});