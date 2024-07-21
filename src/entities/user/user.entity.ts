import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

// Entities
import { BaseEntity } from '../base/base.entity';
import { Reservation } from 'entities/restaurant/reservation.entity';

@Entity('users', { orderBy: { id: 'DESC' } })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({type: 'varchar', length: 100, nullable: false })
  @Unique(['email'])
  email: string;

  @Column({type: 'varchar', length: 100, nullable: false, select: false })
  password: string;

  @Column({type: 'varchar', length: 255, nullable: false })
  name: string;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

}
