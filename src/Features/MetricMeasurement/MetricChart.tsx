import React, { useEffect } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { Provider, createClient, useQuery, useSubscription, subscriptionExchange } from 'urql';
import MeasurementData from './MeasurementData';
import { actions } from './reducer';
import { useDispatch } from 'react-redux';
const subscriptionClient = new SubscriptionClient('ws://react.eogresources.com/graphql', {});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [subscriptionExchange({ forwardSubscription: subs => subscriptionClient.request(subs) })],
});

const measurementQuery = `
query($input: MeasurementQuery! ) {
  getMeasurements(input: $input) {
    metric
    at
    value
    unit
  }
}
`;

const measurement_subscription_query = `
subscription{
    newMeasurement{
        metric
        value
        unit
        at
    }
}
`;
const handleSubscription = (measurements: any = [], response: any) => {
  return [...measurements, response.newMeasurement];
};
export default (props: any): JSX.Element => {
  const [filter, setFilter] = React.useState();

  const filterData = (param: any) => {
    console.log('param', param);
    setFilter(param);
  };
  return (
    <Provider value={client}>
      <div style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <MetricChart filter={filter} />
      </div>
    </Provider>
  );
};

const MetricChart = (props: any) => {
  const [result] = useQuery({
    query: measurementQuery,
  });

  const dispatch = useDispatch();

  const [{ data, error }] = useSubscription({ query: measurement_subscription_query }, handleSubscription);

  useEffect(() => {
    if (error) {
      dispatch(actions.ErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.addLatestMetric(data[data.length - 1]));
  }, [dispatch, data, error]);

  if(data)
    return <MeasurementData query={result.data} data={data} />;
   else 
    return <h3>Could not find data.</h3>;
};