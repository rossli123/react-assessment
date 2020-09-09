import * as React from 'react';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Select, { ValueType, OptionTypeBase, ActionMeta } from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { actions } from './reducer';

const useStyles = makeStyles({
  metricsSelector: {
    width: '400px',
    float: 'right',
    margin: '25px 25px 0 0',
  },
});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query {
  getMetrics
}
`;

const MetricsSelector = () => {
  const classes = useStyles();

  const [selectedOption, setSelectedOption] = React.useState<ValueType<any>>();
  const dispatch = useDispatch();
  const [result] = useQuery({
    query: query,
  });

  const { fetching, data, error } = result;

if (fetching) {
  // console.log("MetricSelector Fetching...");
  return <LinearProgress />
};
  if (error) return <div>Error: Could not find data</div>;
  const options = data.getMetrics.map((metric: any) => {
    return { value: metric, label: metric };
  });
  const changeHandler = (value: ValueType<OptionTypeBase>, actionMeta: ActionMeta<OptionTypeBase>) => {
    setSelectedOption(selectedOption as ValueType<any>);
    switch (actionMeta.action) {
      case 'select-option':
        if (actionMeta.option !== undefined) dispatch(actions.addMetric(actionMeta.option.label));
        console.log('case select-option');
        break;
      case 'remove-value':
        if (actionMeta.removedValue !== undefined) {
          dispatch(actions.removeMetric(actionMeta.removedValue.label));
          console.log('remove pop-value');
        }
        break;
      case 'clear':
        dispatch(actions.removeAllMetrics());
        console.log('case clear');
        break;
    }
  };

  return (
    <div className={classes.metricsSelector}>
      <Select options={options} isMulti={true} value={selectedOption as ValueType<any>} onChange={changeHandler} />
    </div>
  );
};
export default () => {
  return (
    <Provider value={client}>
      <MetricsSelector />
    </Provider>
  );
};
