import { BASE_URL, METRICS_URL } from '../constants/api.constants';
import { Period } from '../enums/period';
import { Metric } from '../interfaces/metric';
import { MetricEntry } from '../interfaces/metric-entry';
import { NetworkError } from './errors/network.error';

export class MetricsService {
  private static buildUrl(path: string, params: Record<string, string> = {}) {
    const pathWithValues = Object.entries(params).reduce(
      (path, [param, value]) => path.replace(`:${param}`, value),
      `${METRICS_URL}${path}`,
    );

    return new URL(pathWithValues, BASE_URL);
  }

  private static async fetch(url: URL, init: RequestInit = {}) {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...init,
    });

    if (!response.ok) throw new NetworkError();

    return response;
  }

  public static async getAll() {
    const url = this.buildUrl('/');
    const response = await this.fetch(url);
    return response.json() as Promise<Metric[]>;
  }

  public static async getById(metricId: string) {
    const url = this.buildUrl('/:id', { id: metricId });
    const response = await this.fetch(url);
    return response.json() as Promise<Metric>;
  }

  public static async getByIdAndPeriod(metricId: string, period: Period) {
    const url = this.buildUrl('/:id/:period', { id: metricId, period });
    const response = await this.fetch(url);
    return response.json() as Promise<Metric>;
  }

  public static async createMetric(metric: Metric) {
    const url = this.buildUrl('/');
    await this.fetch(url, {
      method: 'POST',
      body: JSON.stringify(metric),
    });
  }

  public static async addEntryToMetric(metricId: string, entry: MetricEntry) {
    const url = this.buildUrl('/:id', { id: metricId });
    await this.fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(entry),
    });
  }
}
