import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(2, 10, {
    message: 'Name length should defined between 2 and 10 characters',
  })
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @IsPositive()
  area: number;
}
