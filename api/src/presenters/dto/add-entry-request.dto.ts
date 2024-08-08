import { IsDate, IsNumber, IsUUID } from 'class-validator';
import { AddEntryDto } from 'src/application/dto/add-entry.dto';

export class AddEntryRequestDto implements AddEntryDto {
  @IsUUID()
  metricId: string;

  @IsDate()
  timestamp: Date;

  @IsNumber()
  value: number;
}
