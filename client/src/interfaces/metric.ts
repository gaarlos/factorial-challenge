import { MetricEntry } from './metric-entry';

export interface Metric {
  id?: string;
  name: string;
  entries?: MetricEntry[];
}
