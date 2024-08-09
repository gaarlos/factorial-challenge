import { useCallback, useEffect, useState } from 'react';
import { Status } from '../enums/status';
import { Metric } from '../interfaces/metric';
import { NetworkError } from '../services/errors/network.error';
import { MetricsService } from '../services/metrics.service';

export const useMetrics = () => {
  const [status, setStatus] = useState(Status.LOADING);
  const [metrics, setMetrics] = useState<Metric[]>();

  const getAllMetrics = useCallback(async () => {
    try {
      const metrics = await MetricsService.getAll();

      setMetrics(metrics);
      setStatus(Status.OK);
    } catch (error) {
      if (!(error instanceof NetworkError)) {
        console.error(error);
      }

      setStatus(Status.ERROR);
    }
  }, []);

  useEffect(() => {
    getAllMetrics();
  }, []);

  return { status, metrics, refetch: getAllMetrics };
};
