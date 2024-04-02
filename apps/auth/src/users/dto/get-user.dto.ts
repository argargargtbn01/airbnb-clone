import { IsOptional, IsString } from 'class-validator';

export class GetUserDto {
  @IsString()
  @IsOptional()
  _id: string;

  @IsString()
  @IsOptional()
  uid: string;
}
