import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entities/user/user.entity';
import { userSeed } from '../seeds/user.seed';


export class SeedUserTable1721315402041 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository(User).save(userSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
