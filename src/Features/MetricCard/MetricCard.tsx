import React, { useEffect } from 'react';
import { Provider, createClient, useQuery,useSubscription, subscriptionExchange } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Select, { ValueType, OptionTypeBase, ActionMeta } from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { actions } from './reducer';
import { IState } from '../../store';
const subscriptionClient = new SubscriptionClient('ws://react.eogresources.com/graphql', {});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [subscriptionExchange({ forwardSubscription: subs => subscriptionClient.request(subs) })],
});

const query = `
subscription{
  newMeasurement{
      metric
      value
      unit
      at
  }
}
`;

const useStyles = makeStyles({
  
});

const handleSubscription = (measurements: any = [], response: any) => {
  return [...measurements, response.newMeasurement];
};

const getMetric = (state: IState) => {
  const { metric, measurement }: any = state;
  return {
    metric,
    measurement,
  };
};

const MetricCard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [{ data, error }] = useSubscription({ query: query }, handleSubscription);
  const { metric, measurement } = useSelector(getMetric);
  // const [result] = useQuery({
  //   query: query,
  // });

  // const { fetching, data, error } = result;
  // if (fetching) return <LinearProgress />;
  // if (error) return <div>Error: Could not find data. </div>;
  
  useEffect(() => {
    if (error) {
      dispatch(actions.ErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.addMetric(data[data.length - 1]));
  }, [dispatch, data, error]);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 200px 200px', gridGap: '10px 10px', marginTop: 20 }}>
      {metric.metrics.map((m: any, key: any) => (
        <MetricCard
          key={key}
          metric={m}
          value={
            measurement[m] !== undefined
              ? measurement[m].points[measurement[m].points.length - 1].value
              : 0
          }
        />
      ))}
    </div>
  );

  return (
    <div className={classes.metricsSelector}>

    </div>
  );
};


export default () => {
  return (
    <Provider value={client}>
      <MetricCard />
    </Provider>
  );
};
