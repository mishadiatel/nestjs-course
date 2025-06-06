import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique user id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 'ADMIN', description: 'User role value' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare value: string;

  @ApiProperty({ example: 'Administrator', description: 'User role password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @BelongsToMany(() => User, () => UserRoles)
  declare users: User[];
}
