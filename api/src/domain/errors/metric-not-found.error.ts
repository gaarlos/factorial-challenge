import { DomainError } from '../errors/domain-error';
import { ErrorCode } from '../enum/error-code.enum';

export class MetricNotFound extends DomainError {
  public code = ErrorCode.METRIC_NOT_FOUND;

  constructor(id: string) {
    super(`Metric "${id}" not found`);
  }
}
