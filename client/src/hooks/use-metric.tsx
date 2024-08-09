import { useCallback, useEffect, useState } from 'react';
import { Status } from '../enums/status';
import { Metric } from '../interfaces/metric';
import { NetworkError } from '../services/errors/network.error';
import { MetricsService } from '../services/metrics.service';
import { Period } from '../enums/period';

export const useMetric = (id: string, period = Period.DAY) => {
  const [status, setStatus] = useState(Status.LOADING);
  const [metric, setMetric] = useState<Metric>();

  const getMetric = useCallback(async () => {
    try {
      const metric = await MetricsService.getByIdAndPeriod(id, period);

      setMetric(metric);
      setStatus(Status.OK);
    } catch (error) {
      if (!(error instanceof NetworkError)) {
        console.error(error);
      }

      setStatus(Status.ERROR);
    }
  }, [id, period]);

  useEffect(() => {
    getMetric();
  }, [getMetric]);

  return { status, metric, refetch: getMetric };
};
