import { MigrationInterface, QueryRunner } from "typeorm";

export class DelColLastLogin1733062918944 implements MigrationInterface {
    name = 'DelColLastLogin1733062918944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_auth\` DROP COLUMN \`last_login\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_auth\` ADD \`last_login\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
