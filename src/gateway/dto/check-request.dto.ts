import { IsEmail, IsOptional, IsObject, IsBoolean } from 'class-validator';

export class MockOptionsDto {
  @IsBoolean()
  enable: boolean;

  @IsBoolean()
  withLeaks: boolean;
}

export class CheckRequestDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsObject()
  mock?: MockOptionsDto;
}