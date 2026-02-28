import { IsString, IsDateString, IsOptional, IsNumber } from 'class-validator'

export class CreateTripDto {
  @IsString()
  title: string

  @IsString()
  destination: string

  @IsDateString()
  startDate: string

  @IsDateString()
  endDate: string

  @IsOptional()
  @IsNumber()
  budget?: number

}