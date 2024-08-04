import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseEntity } from 'entities/base/base.entity';
import { Table } from 'entities/restaurant/table.entity';

@Entity('restaurants', { orderBy: { id: 'DESC' } })
export class Restaurant extends BaseEntity {

	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
	@Unique(['name'])
	name: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	@Unique(['address'])
	address: string;

	@Column({ type: 'varchar', length: 100, nullable: true})
	phone: string;

	@Column({type: 'varchar', length: 100, nullable: true})
	cuisine: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@OneToMany(() => Table, (table) => table.restaurant, {
		eager: true,
		cascade: true
	})
	tables: Table[];
}