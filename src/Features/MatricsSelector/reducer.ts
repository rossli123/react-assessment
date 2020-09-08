import { createSlice, PayloadAction } from 'redux-starter-kit';

// this is a reducer for MetricsSelector

export type ErrorAction = {
  error: string;
};

const initialState: { loading: boolean; metrics: string[] } = { loading: false, metrics: [] };

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    addMetric: (state, action: PayloadAction<string>) => {
      state.metrics.push(action.payload);
    },
    removeMetric: (state, action: PayloadAction<string>) => {
      state.metrics = state.metrics.filter(metric => 
        metric !== action.payload
      )
    },
    removeAllMetrics: (state, action: PayloadAction) => {
        state.metrics = [];
    },
    ErrorReceived: (state, action: PayloadAction<ErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
