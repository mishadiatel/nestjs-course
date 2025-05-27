import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'user email' })
  readonly email: string;
  @ApiProperty({ example: 'pass1234', description: 'user password' })
  readonly password: string;
}
