import { FC, useCallback, useState } from 'react';
import { useMetric } from '../hooks/use-metric';
import { Period } from '../enums/period';
import { AddMetricEntryModal } from './modals/add-metric-entry-modal';
import { MetricChart } from './metric-chart';

interface Props {
  id: string;
}

export const Metric: FC<Props> = ({ id }) => {
  const [period, setPeriod] = useState(Period.DAY);
  const [showModal, setShowModal] = useState(false);
  const { metric } = useMetric(id, period);

  const getButtonClass = useCallback(
    (buttonPeriod: Period) => {
      let classes =
        'px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700';

      if (period === buttonPeriod) {
        classes += ' bg-gray-100';
      }

      return classes;
    },
    [period],
  );

  return (
    metric && (
      <div className="mt-10">
        <AddMetricEntryModal
          metricId={id}
          show={showModal}
          setShow={setShowModal}
        />

        <div className="flex gap-4">
          <h1 className="text-xl font-bold">{metric.name}</h1>
          <button
            className="border border-red-500 hover:bg-red-400/10 text-sm text-red-500 py-1 px-4 rounded"
            onClick={() => setShowModal(true)}
          >
            Add metric
          </button>
        </div>

        <div className="inline-flex rounded-md shadow-sm mt-5" role="group">
          <button
            type="button"
            onClick={() => setPeriod(Period.MINUTE)}
            className={getButtonClass(Period.MINUTE)}
          >
            Last hour
          </button>
          <button
            type="button"
            onClick={() => setPeriod(Period.HOUR)}
            className={getButtonClass(Period.HOUR)}
          >
            Last 24 hours
          </button>
          <button
            type="button"
            onClick={() => setPeriod(Period.DAY)}
            className={getButtonClass(Period.DAY)}
          >
            Last 7 days
          </button>
        </div>

        <MetricChart metric={metric} period={period} />
      </div>
    )
  );
};
