import { FC } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Period } from '../enums/period';
import { Metric } from '../interfaces/metric';
import { useChart } from '../hooks/use-chart';

interface Props {
  metric: Metric;
  period: Period;
}

export const MetricChart: FC<Props> = ({ metric, period }) => {
  const { data, average, domain } = useChart(metric.entries, period);

  if (!data.length) {
    return <div className="my-6 italic">No data available</div>;
  }

  return (
    <>
      <div className="my-6">Average: {average}</div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <XAxis dataKey="time" domain={domain} />
          <YAxis />
          <Tooltip formatter={(value) => [value, 'Value (avg)']} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
