import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseEntity } from 'entities/base/base.entity';

@Entity('restaurants', { orderBy: { id: 'DESC' } })
export class Restaurant extends BaseEntity {

	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ length: 255, nullable: false })
	@Unique(['name'])
	name: string;

	@Column({ length: 255, nullable: true })
	@Unique(['address'])
	address: string;

	@Column({length: 100, nullable: true})
	phone: string;

	@Column({length: 100, nullable: true})
	cuisine: string;
}