import { createSlice, PayloadAction } from 'redux-starter-kit';

// this is a reducer for MetricCard

export type ErrorAction = {
  error: string;
};

const initialState: {
  [metric: string]: {
    name: string;
    utc: boolean;
    columns: string[];
    points: { time: number; value: number; unit: string }[];
  };
} = {};


const slice = createSlice({
  name: 'mesurement',
  initialState,
  reducers: {
    addMetric: (state, action: PayloadAction<{ metric: string; at: number; value: number; unit: string }>) => {
      const { metric, at, value, unit } = action.payload;
      // console.log('mesurement reducer: metric=',metric,' at=',at,' value=',value,' unit=',unit);
      if (!state[metric]) {
        state[metric] = {
          name: metric,
          utc: true,
          columns: ['time', 'value', 'unit'],
          points: [{ time: at, value, unit }],
        };
      } else {
        state[metric].points.push({ time: at, value, unit });
      }
    },
    ErrorReceived: (state, action: PayloadAction<ErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
