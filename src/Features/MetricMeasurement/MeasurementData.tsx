import * as React from 'react';
import { Provider, createClient, useQuery } from 'urql';
import MeasurementChart from './MeasurementChart';
import LinearProgress from '@material-ui/core/LinearProgress';
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});
const query = `
query {
  heartBeat
}
`;
export default (props: any) => {
  return (
    <Provider value={client}>
      <MeasurementData {...props} />
    </Provider>
  );
};
const MeasurementData = (props: any) => {
  const [result] = useQuery({
    query,
  });

  const { fetching, data, error } = result;
  if (fetching)
    return <LinearProgress />;
  if (error){
      return <div>{error.message}</div>
  }
  
  return <MeasurementChart {...props} />;
};