import { FC, FormEvent, useCallback, useState } from 'react';
import { MetricsService } from '../../services/metrics.service';
import { ModalWrapper } from './modal-wrapper';

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

export const CreateMetricModal: FC<Props> = ({ show, setShow }) => {
  const [name, setName] = useState('');

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await MetricsService.createMetric({
        name,
        entries: [
          {
            timestamp: new Date().toISOString(),
            value: Math.random(),
          },
        ],
      });

      setShow(false);
    },
    [name],
  );

  return (
    <ModalWrapper show={show} setShow={setShow}>
      <form onSubmit={onSubmit} className="p-4 w-80">
        <label>
          <span className="block mb-2 text-sm font-medium text-gray-900">
            Metric name
          </span>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </label>

        <button
          type="submit"
          className="mt-4 bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded"
        >
          Add entries
        </button>
      </form>
    </ModalWrapper>
  );
};
