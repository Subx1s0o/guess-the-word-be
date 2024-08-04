import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AmountDTO {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsInt()
  amount: number;
}
