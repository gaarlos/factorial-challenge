import { AddEntryDto } from './add-entry.dto';

export interface CreateMetricDto {
  name: string;
  entries: Omit<AddEntryDto, 'metricId'>[];
}
