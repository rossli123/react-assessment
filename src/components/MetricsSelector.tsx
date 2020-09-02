import * as React from 'react';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';

const selectOptions = ['a', 'b', 'c']
const client = createClient({
    url: 'https://react.eogresources.com/graphql',
});

const query = `
query {
  getMetrics
}
`;

const MetricsSelector = () => {
    const [result] = useQuery({
        query: query,
    });

    const { fetching, data, error } = result;
    
    
    if (fetching) return <LinearProgress />;
    console.log("have data now")
    console.log(data.getMetrics);

    return (

        <div>
            <select>{data.getMetrics.map((options:string, index:  number ) => {
                return <option value={options} key={index}>{options}</option>
            })}
            </select>
        </div>
    );

}
export default () => {
    return(
    <Provider value={client}>
        <MetricsSelector />
    </Provider>);
};