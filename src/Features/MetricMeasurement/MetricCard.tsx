import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { actions } from './reducer';
import { Provider, createClient, useSubscription, subscriptionExchange } from 'urql';
import  MesurementCard  from '../../components/MesurementCard';
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
export default (): JSX.Element => {
  return (
    <Provider value={client}>
      <MetricCard />
    </Provider>
  );
};

const handleSubscription = (measurements: any = [], response: any) => {
  // console.log(measurements)
  console.log('handelsubscription with mesurements', ...measurements)
  return [...measurements, response.newMeasurement];
};

const getMetric = (state: IState) => {
  

  const { metric, measurement }: any = state;
  console.log('let see what happend with measurement' , measurement);

  return {
    metric,
    measurement,
  };
};
const MetricCard = (): JSX.Element  => {
  const { metric, measurement } = useSelector(getMetric);
  const dispatch = useDispatch();

  const [{ data, error }] = useSubscription({ query: query }, handleSubscription);
  useEffect(() => {
    if (error) {
      dispatch(actions.ErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.addLatestMetric(data[data.length - 1]));
  }, [dispatch, data, error]);
  // console.log(metric,"metric");
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 200px 200px', gridGap: '10px 10px', marginTop: 20 }}>
      {metric.metrics.map((metric: any, key: any) => (
        <MesurementCard
          key={key}
          metric={metric}
          value={
            measurement[metric] !== undefined
              ? measurement[metric].points[measurement[metric].points.length - 1].value
              : 0
          }
        />
      ))}
    </div>
  );
};

