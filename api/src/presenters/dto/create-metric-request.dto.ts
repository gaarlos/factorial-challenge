import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateMetricDto } from 'src/application/dto/create-metric.dto';
import { Type } from 'class-transformer';

class CreateMetricEntryDto {
  @IsDate()
  timestamp: Date;

  @IsNumber()
  value: number;
}

export class CreateMetricRequestDto implements CreateMetricDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMetricEntryDto)
  entries: CreateMetricEntryDto[];
}
