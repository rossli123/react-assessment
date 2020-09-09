import { createSlice, PayloadAction } from 'redux-starter-kit';

// this is a reducer for MetricCard

export type ErrorAction = {
  error: string;
};

const initialState: { loading: boolean; metrics: string[] } = { loading: false, metrics: [] };

const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    
    ErrorReceived: (state, action: PayloadAction<ErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
