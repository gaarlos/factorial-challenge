import { useEffect, useState } from 'react';
import { useMetrics } from '../hooks/use-metrics';
import { CreateMetricModal } from './modals/create-metric-modal';
import { Metric } from './metric';

export const Dashboard = () => {
  const { metrics, refetch } = useMetrics();
  const [selectedMetricId, setSelectedMetricId] = useState<string>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!metrics || !metrics[0]) {
      return;
    }

    setSelectedMetricId(metrics[0].id);
  }, [metrics]);

  return (
    <div>
      <CreateMetricModal
        show={showModal}
        setShow={setShowModal}
        refetch={refetch}
      />
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
          Add metric
        </button>
      </div>

      {metrics?.length ? (
        <select
          value={selectedMetricId}
          onChange={(ev) => setSelectedMetricId(ev.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5"
        >
          {metrics.map((metric) => (
            <option key={metric.id} value={metric.id}>
              {metric.name}
            </option>
          ))}
        </select>
      ) : (
        <div className="text-gray-500 italic">There's no metrics, add one</div>
      )}
      {selectedMetricId && <Metric id={selectedMetricId} />}
    </div>
  );
};
