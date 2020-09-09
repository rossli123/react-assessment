import React, { useEffect } from 'react';
import { Provider, createClient, useQuery,useSubscription, subscriptionExchange } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Select, { ValueType, OptionTypeBase, ActionMeta } from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { actions } from './reducer';
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


const MetricCard = () => {
  const classes = useStyles();

  const [selectedOption, setSelectedOption] = React.useState<ValueType<any>>();
  const dispatch = useDispatch();
  const [result] = useQuery({
    query: query,
  });

  const { fetching, data, error } = result;

  if (fetching) return <LinearProgress />;
  if (error) return <div>Error: Could not find data. </div>;
  const options = data.getMetrics.map((metric: any) => {
    return { value: metric, label: metric };
  });


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
