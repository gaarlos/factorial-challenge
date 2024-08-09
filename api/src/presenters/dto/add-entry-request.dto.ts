import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsUUID } from 'class-validator';
import { AddEntryDto } from 'src/application/dto/add-entry.dto';

export class AddEntryRequestDto implements AddEntryDto {
  @IsUUID()
  metricId: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  timestamp: Date;

  @IsNumber()
  value: number;
}
