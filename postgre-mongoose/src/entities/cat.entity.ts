import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cat')
export default class CatPg {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public colour: string;

  @Column()
  public sex: string;

  @Column()
  public age: number;
}
