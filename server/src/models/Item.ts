import {Model, Table, Column, Unique} from 'sequelize-typescript';


@Table
export class Item extends Model {

  @Unique @Column
  url!: string;

  @Column
  title!: string;

  @Column
  price!: string;

  @Column
  image: string;

}
