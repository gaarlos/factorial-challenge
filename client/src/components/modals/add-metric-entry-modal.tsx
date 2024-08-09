import { FC, FormEvent, useCallback, useState } from 'react';
import { MetricsService } from '../../services/metrics.service';
import { ModalWrapper } from './modal-wrapper';

interface Props {
  metricId: string;
  show: boolean;
  setShow: (show: boolean) => void;
}

export const AddMetricEntryModal: FC<Props> = ({ metricId, show, setShow }) => {
  const [timestamp, setTimestamp] = useState(new Date().toString());
  const [value, setValue] = useState(0);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const entry = { metricId, timestamp, value };
      await MetricsService.addEntryToMetric(metricId, entry);

      setShow(false);
    },
    [metricId, timestamp, value, setShow],
  );

  return (
    <ModalWrapper show={show} setShow={setShow}>
      <form onSubmit={onSubmit} className="p-4 w-80">
        <label>
          <span className="block mb-2 text-sm font-medium text-gray-900">
            Timestamp
          </span>
          <input
            type="datetime-local"
            value={timestamp}
            onChange={(ev) => setTimestamp(ev.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </label>
        <label>
          <span className="block mb-2 text-sm font-medium text-gray-900">
            Value
          </span>
          <input
            type="number"
            value={value}
            onChange={(ev) => setValue(Number(ev.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </label>

        <button
          type="submit"
          className="mt-4 bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded"
        >
          Add entry
        </button>
      </form>
    </ModalWrapper>
  );
};
