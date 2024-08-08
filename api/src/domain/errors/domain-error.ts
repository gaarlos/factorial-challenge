import { ErrorCode } from '../enum/error-code.enum';

export abstract class DomainError extends Error {
  public readonly name = this.constructor.name;
  public abstract readonly code: ErrorCode;
}
