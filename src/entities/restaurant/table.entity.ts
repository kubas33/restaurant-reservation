import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'entities/base/base.entity';
import { Restaurant } from 'entities/restaurant/restaurant.entity';
import { Reservation } from 'entities/restaurant/reservation.entity';

@Entity('tables', { orderBy: { id: 'DESC' } })
export class Table extends BaseEntity{

	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'varchar', length: 100, nullable: false })
	name: string;

	@Column({ type: 'int', nullable: false })
	seats: number;

	@ManyToOne(() => Restaurant, (restaurant) => restaurant.tables, {
		onDelete: 'CASCADE',
	})
	restaurant: Restaurant;

	@OneToMany(() => Reservation, (reservation) => reservation.table, {
		cascade: true
	})
	reservations: Reservation[];
}