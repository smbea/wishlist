import {Model, Table, Column, Unique} from 'sequelize-typescript';


@Table
export class User extends Model {

  @Unique @Column
  username!: string;

  @Column
  password!: string;

}
