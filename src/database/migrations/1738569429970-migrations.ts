import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1738569429970 implements MigrationInterface {
    name = 'Migrations1738569429970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_auth\` ADD \`last_login\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_auth\` DROP COLUMN \`last_login\``);
    }

}
