import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFollows1656700866539 implements MigrationInterface {
    name = 'CreateFollows1656700866539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`follows\` (\`id\` int NOT NULL AUTO_INCREMENT, \`followerId\` int NOT NULL, \`followingId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`follows\``);
    }

}
