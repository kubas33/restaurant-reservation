import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1721315372569 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'users',
            columns: [
              {
					  name: 'id',
	              type: 'int',
	              isPrimary: true,
	              isGenerated: true,
	              generationStrategy: 'increment',
              },
              {
					  name: 'name',
	              type: 'varchar',
	              isNullable: false,
	              length: '255',

              },
              {
					  name: 'email',
	              type: 'varchar',
	              length: '100',
	              isNullable: false,
              },
	            {
		            name: 'password',
		            type: 'varchar',
		            length: '100',
		            isNullable: false,
	            },
	            {
		            name: 'createdAt',
		            type: 'datetime',
		            default: 'CURRENT_TIMESTAMP',
	            },
	            {
		            name: 'updatedAt',
		            type: 'datetime',
		            default: 'CURRENT_TIMESTAMP',
	            },
	            {
		            name: 'isDeleted',
		            type: 'tinyint',
		            default: '0',
	            },
            ],
	          uniques: [{ columnNames: ['email'] }],
          })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		  await queryRunner.dropTable('users');
    }

}
