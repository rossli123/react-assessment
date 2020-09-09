import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/MatricsSelector/reducer';
import { reducer as mesurementReducer } from '../Features/MetricCard/reducer';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
  mesurement: mesurementReducer,
};
