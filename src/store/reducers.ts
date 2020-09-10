import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/MatricsSelector/reducer';
import { reducer as measurementReducer } from '../Features/MetricMeasurement/reducer';

export default {
  weather: weatherReducer,
  metric: metricsReducer,
  measurement: measurementReducer,
};
