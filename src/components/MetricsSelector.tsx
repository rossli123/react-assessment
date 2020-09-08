import * as React from 'react';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Select from 'react-select'


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
    const options = data.getMetrics.map((metric: any) => { return { value: metric, label: metric } })

    return (
        <Select options={options} isMulti={true} />
    );

}
export default () => {
    return (
        <div style={{ width: '400px', float: 'right', margin: '20px 20px 0 0' }}>
            <Provider value={client}>
                <MetricsSelector />
            </Provider>
        </div>);
};