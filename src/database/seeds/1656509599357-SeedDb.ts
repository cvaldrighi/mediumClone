import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDb1656509599357 implements MigrationInterface {
    name = 'SeedDb1656509599357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO tags (name) VALUES ('vinil'), ('coffee')`            
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}