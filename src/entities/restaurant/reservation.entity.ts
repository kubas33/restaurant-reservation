import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'entities/base/base.entity';
import { User } from 'entities/user/user.entity';
import { Table } from 'entities/restaurant/table.entity';

@Entity('reservations', { orderBy: { id: 'DESC' } })
export class Reservation extends BaseEntity{

	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'datetime' })
	startTime: Date;

	@Column({ type: 'datetime' })
	endTime: Date;

	@Column({ type: 'int' })
	numberOfGuests: number;

	@ManyToOne(() => User, { eager: true })
	user: User;

	@ManyToOne(() => Table, { eager: true })
	table: Table;

	@Column({ type: 'text', nullable: true })
	specialRequests: string;
}