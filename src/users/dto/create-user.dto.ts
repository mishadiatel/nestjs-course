import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'user email' })
  @IsString({ message: 'must be string' })
  @IsEmail({}, { message: 'must be email' })
  readonly email: string;

  @ApiProperty({ example: 'pass1234', description: 'user password' })
  @IsString({ message: 'must be string' })
  @Length(4, 16, { message: 'must be at least 4 characters' })
  readonly password: string;
}
